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
import { converter } from "js-cookie";

// VERY IMPORTANT FOR COOKIES
axios.defaults.withCredentials = true;

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
        max : "",
        maxreps : "",
        datasets: [
          {
            label: "Weight",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: "1 RM Goal",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0)",
            borderColor: "rgba(255,70,70,1)",
          },
          {
            label: "Reps",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0)",
            borderColor: "rgba(70,255,70,1)",
          },
          {
            label: "Predicted 1RM",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0)",
            borderColor: "rgba(252, 50, 229,1)",
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
        }
      })
      .catch((error) => {
        this.setState({
          ErrorMessage: error.response.data.error_message
        });
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
        if (response.data.success === true) {
          const user = response.data.user;
          const token = response.data.accessToken;
          this.setState({
            IsLoggedIn: true,
            User: user,
            accessToken: token,
          });
        }
      })
      .catch((error) => {
        this.setState({
          ErrorMessage: error.response.data.error_message
        });
      });
  };

  logOut = () => {
    axios.post(BaseURL + "/users/logout", {});
    this.setState({
      IsLoggedIn: false,
      User: {},
      accessToken: "",
    });
  };

  handleSelect = (e) => {
    this.setState({ CurrentExercise: e });
    this.getData(e, this.state.accessToken);
  };

  //handle of updatigng excercise List
  handleUpdate = (excerciseList) => {
    console.log(excerciseList);
    console.log(this.state.excerciseGoal);

    axios
      .post(BaseURL + "/exercises/log/update", {
        user: this.state.User,
        exerciseName: this.state.CurrentExercise,
        exerciseHistory: excerciseList,
        exerciseGoal: this.state.excerciseGoal,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          this.handleSelect(this.state.CurrentExercise);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status == 403) {
          this.logOut();
        }
      });
  };

  handleChangeGoal = (goal) => {
    //this.state.CurrentExcerciseGoal = goal;
    this.state.excerciseGoal = goal;
    this.handleUpdate(this.state.excerciseList);
  };

  formatDate = (ogdate) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let datefixed = new Date(ogdate.toString().replace(/-/g, '\/').replace(/T.+/, ''));
    //console.log(datefixed)
    let dateformat = new Date(datefixed).toLocaleDateString("en-US", options);
    return dateformat
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
          max : "",
          maxreps : "",
          datasets: [
            {
              label: "Weight",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "1 RM Goal",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0)",
              borderColor: "rgba(255,70,70,1)",
            },
            {
              label: "Reps",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0)",
              borderColor: "rgba(70,255,70,1)",
            },
            {
              label: "Predicted 1RM",
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0)",
              borderColor: "rgba(252, 50, 229,1)",
            },
          ],
        };
        let newExcerciseList = [];
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        data.datasets[2].data = [];
        data.datasets[3].data = [];
        this.state.max = "";
        this.state.maxreps = "";
        // console.log("reach here?");
        // console.log(response.data);
        // console.log(exercise);
        let newExcerciseGoal = 0;
        // console.log(response.data);
        response.data.forEach((element) => {
          //let exercise = element.json()
          var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          if (element.exerciseName === exercise) {
            newExcerciseGoal = element.exerciseGoal;
            this.state.max = element.exercisePR.value
            this.state.maxreps = element.exercisePR.reps
            // console.log("reach here?");
            //if picked exercise matches exercise from data, push date to labels, data to history, as well as goal
            element.exerciseHistory.forEach((pr) => {
              //data.labels.push(this.formatDate(pr.date.toString()));
              //console.log(pr.date)
              data.labels.push(this.formatDate(pr.date));
              data.datasets[0].data.push(pr.value);
              data.datasets[1].data.push(element.exerciseGoal);
              data.datasets[2].data.push(pr.reps);
              //let predictedRM = pr.value/(1.0278-(.0278*pr.reps))
              let predictedRM = pr.value *Math.pow(pr.reps, .1)
              data.datasets[3].data.push(predictedRM)
              newExcerciseList.push(pr);
            });
            //pushing pr at end of list, instead print it somewhere else?
            //data.datasets[0].data.push(element.exercisePR.value);
            //data.labels.push(
            //this.formatDate(element.exercisePR.date.toString())
            //);
            //data.datasets[1].data.push(element.exerciseGoal);
            // console.log("marker2");
          }
        });
        // console.log(newExcerciseGoal);
        this.setState({
          graphData: data,
          excerciseList: newExcerciseList,
          excerciseGoal: newExcerciseGoal,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status == 403) {
          this.logOut();
        }
        console.log(error);
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
                  exerciseSelected={this.state.CurrentExercise !== ""}
                  CurrentExercise = {this.state.CurrentExercise}
                  max = {this.state.max}
                  maxreps = {this.state.maxreps}
                  exerciseGoal = {this.state.excerciseGoal}
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