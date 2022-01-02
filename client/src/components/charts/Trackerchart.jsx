import Cookies from 'js-cookie'
import { Line as ChartJS } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import axios from 'axios';

const data = {
  labels: [],
  datasets: [
    {
      label: "History",
      data: [],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Goal",
      data: [],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
  ]
};

function getData(loggedInUser, exercise) {
  console.log(Cookies.get())
  console.log(loggedInUser)
  console.log(exercise)
  // axios.get('http://localhost:5000/exercises/log', {}, {
  //   headers: {
  //     Cookie: req.cookies.accessToken
  //   }
  // })
  //   .then(response => {
  //     data.labels = []
  //     data.datasets[0].data = []
  //     data.datasets[1].data = []
  //     response.forEach((element) => {
  //       let exercise = element.json()
  //       if(exercise.exerciseName.equals(exercise)){
  //       //if picked exercise matches exercise from data, push date to labels, data to history, as well as goal
  //       data.labels.push(exercise.exercisePRHistory[1].toString());
  //       data.datasets[0].data.push(exercise.exercisePR)
  //       data.datasets[0].data.push(exercise.exercisePRHistory[0])
  //       data.datasets[1].data.push(exercise.exerciseGoal)
  //       }
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
}
export const Trackerchart = (props) => {
  return (
    <div className="chart">
      {getData(props.CurrentUser, props.CurrentExercise)}
      <Line data={data} />
    </div>
  );
}