import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/Login";
import Register from "./components/Register";
import React, { Component } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { Exercisepicker } from "./components/exercisepicker/Exercisepicker";
import { Trackerchart } from "./components/charts/Trackerchart";
import { ExerciseHistory } from "./components/ExerciseHistory/ExerciseHistory";
import { Navbar } from "react-bootstrap";
import { MyNav } from "./components/navbar";
import { ExcerciseHistoryList } from "./components/ExerciseHistory/ExcerciseHistoryList";

const salt = bcrypt.genSaltSync(10);
const BaseURL = "http://localhost:5000";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedIn: false,
      User: {
        username: "",
        name: "",
        email: "",
        // Other fields maybe applied
      },
      ErrorMessage: "",
      CurrentExercise: "",
      accessToken: "",
      graphData: {
        labels: [],
        datasets: [
          {
            label: "History",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: "Goal",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      },
      excerciseList: [],
      excerciseGoal: 0,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister = (email, username, name, password) => {
    // Encrypt the password and send it to server
    const hashedPassword = bcrypt.hashSync(password, salt);
    axios
      .post(BaseURL + "/users/register", {
        email: email,
        username: username,
        name: name,
        password: hashedPassword,
      })
      .then((response) => {
        if (response.data.success === true) {
          const user = response.data.user;
          this.setState({
            IsLoggedIn: true,
            User: user,
          });
        } else {
          this.setState({
            ErrorMessage: "The username has already been taken!",
          });
        }
      });
  };

  handleLogin = (username, password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    axios
      .post(BaseURL + "/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          const user = response.data.user;
          const token = response.data.accessToken;
          this.setState({
            IsLoggedIn: true,
            User: user,
            accessToken: token,
          });
        } else {
          this.setState({
            ErrorMessage: "Wrong username or password!",
          });
        }
      });
  };

  handleSelect = (e) => {
    this.setState({ CurrentExercise: e });
    this.getData(e, this.state.accessToken);
  };

  //handle of updatigng excercise List
  handleUpdate = (excerciseList) => {
    console.log(excerciseList);

    axios
      .post(BaseURL + "/log/update", {
        user: this.state.User,
        excerciseName: this.state.CurrentExercise,
        excerciseHistory: excerciseList,
        excerciseGoal: this.excerciseGoal,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          this.getData(this.CurrentExercise, this.state.accessToken);
        }
      });
  };

  handleChangeGoal = (goal) => {
    this.state.CurrentExcerciseGoal = goal;
    this.handleUpdate(this.state.excerciseList);
  };

  formatDate = (date) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  getData = (exercise, token) => {
    axios
      .get("http://localhost:5000/exercises/log", {
        headers: {
          accessToken: token,
        },
      })
      .then((response) => {
        const data = {
          labels: [],
          datasets: [
            {
              label: "History",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Goal",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        };
        let newExcerciseList = [];
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        // console.log("reach here?");
        // console.log(response.data);
        // console.log(exercise);
        let newExcerciseGoal = 0;
        response.data.forEach((element) => {
          //let exercise = element.json()
          var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          newExcerciseGoal = element.excerciseGoal;

          if (element.exerciseName === exercise) {
            // console.log("reach here?");
            //if picked exercise matches exercise from data, push date to labels, data to history, as well as goal
            element.exercisePRHistory.forEach((pr) => {
              //   console.log(pr.date);
              data.labels.push(this.formatDate(pr.date.toString()));
              data.datasets[0].data.push(pr.value);
              data.datasets[1].data.push(element.exerciseGoal);
              newExcerciseList.push(pr);
            });
            data.datasets[0].data.push(element.exercisePR.value);
            data.labels.push(
              this.formatDate(element.exercisePR.date.toString())
            );
            data.datasets[1].data.push(element.exerciseGoal);
            // console.log("marker2");
          }
        });
        this.setState({
          graphData: data,
          excerciseList: newExcerciseList,
          excerciseGoal: newExcerciseGoal,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  logOut = () => {
    this.setState({
      IsLoggedIn: false,
      User: {},
      accessToken: "",
    });
  };

  render() {
    const loggedIn = this.state.IsLoggedIn;
    // console.log(loggedIn);
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home loggedIn={this.state.IsLoggedIn} logOut={this.logOut} />
          </Route>
          <Route exact path="/users/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onLogin={this.handleLogin}
                errorMessage={this.state.ErrorMessage}
                user={this.state.User}
              />
            )}
          </Route>
          <Route exact path="/exercises/log">
            {loggedIn ? (
              <>
                <MyNav loggedIn={this.state.IsLoggedIn} logOut={this.logOut} />
                <ExerciseHistory
                  handleSelect={this.handleSelect}
                  excerciseList={this.state.excerciseList}
                  graphData={this.state.graphData}
                  onUpdate={this.handleUpdate}
                  onChangeGoal={this.handleChangeGoal}
                />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/users/register">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onRegister={this.handleRegister}
                errorMessage={this.state.ErrorMessage}
                user={this.state.User}
              />
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
