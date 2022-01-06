import Cookies from "js-cookie";
import { Line as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import React, { Component } from "react";

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
    super(props);
  }

  // componentDidUpdate(){
  //   console.log('MARKER1')
  //   this.getData(this.props.CurrentUser, this.props.CurrentExercise, this.props.accessToken)
  // }

  render() {
    // console.log("marker1");
    // console.log(this.props.graphData);
    return (
      <div className="chart">
        <Line data={this.props.graphData} />
      </div>
    );
  }
}
