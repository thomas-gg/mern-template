import Cookies from 'js-cookie'
import { Line as ChartJS } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import React, { Component } from "react";

const data = {
  labels: [],
  datasets: [
    {
      label: "History",
      data: [20,200,140],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Goal",
      data: [20,20,40],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
  ]
};

// export const Trackerchart = (props) => {
//   return (
//     <div className="chart">
//       {getData(props.CurrentUser, props.CurrentExercise, props.accessToken)}
//       <Line data={data} />
//     </div>
//   );
// }

export class Trackerchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphData: data
    }
  }

  // componentDidUpdate(){
  //   console.log('MARKER1')
  //   this.getData(this.props.CurrentUser, this.props.CurrentExercise, this.props.accessToken)
  // }

  onExerciseSelect = (event) =>{
    event.preventDefault()
    this.props.Onselect(this.getData(this.props.CurrentUser, this.props.CurrentExercise, this.props.accessToken))
  }

  getData = (loggedInUser, exercise, token) => {
    axios.get('http://localhost:5000/exercises/log', {
      headers: {
        accessToken: token,
      }
    })
      .then(response => {
        data.labels = []
        data.datasets[0].data = []
        data.datasets[1].data = []
        response.data.forEach((element) => {
          //let exercise = element.json()
          console.log('MARKER1')
          console.log(element.exerciseName)
          console.log(exercise)
          if (element.exerciseName === (exercise)) {
            //if picked exercise matches exercise from data, push date to labels, data to history, as well as goal
            //data.labels.push(element.exercisePRHistory[1].toString());
            data.datasets[0].data.push(element.exercisePR)
            data.datasets[0].data.push(element.exercisePRHistory[0])
            data.datasets[1].data.push(element.exerciseGoal)
            console.log('MARKER2')
            console.log(data)
            console.log('MARKER3')
            this.setState({ graphData: data })
          }
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    console.log(this.state.graphData)
    return (
      <div className="chart">
        <Line data={this.state.graphData} />
      </div>
    );
  }
}