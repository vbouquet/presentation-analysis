import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import SimpleLineChart      from './SimpleLineChart.jsx'

class PresenceChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: true,
      time: 4,
      increment: 1,
      xAxisId: "time",
      yAxisId: "people",
      data: [
        {"time": 0, "people": 100}
      ]
    };
  }

  randomData() {
    return Math.floor(Math.random() * (100-0) + 1)
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      4000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((prevState, props) => ({
      time: prevState.time + prevState.increment,
      data: [
        ...prevState.data,
        {
          "time": prevState.time + prevState.increment,
          "people": this.randomData()
        }
      ]
    }), () => { console.log(this.state)});
  }

  render() {
    const active = this.props.active;
    if (active)
      return <SimpleLineChart data={this.state.data} />;
    else {
      <div>
        No Presence chart active !
      </div>
    }
  }
}

export default PresenceChart;