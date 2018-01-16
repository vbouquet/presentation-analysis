import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleAreaChart from './SimpleAreaChart.jsx'

const propTypes = {
  color: PropTypes.string.isRequired,
};

const defaultProps = {
  color: "#82ca9d",
}

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
      4000,
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
    const { active } = this.props;
    const { color } = this.props;
    const label = this.state.yAxisId;
    if (active)
      return (
        <SimpleAreaChart data={this.state.data} label={label} color={color}/>
      );
    else {
      return (
        <div>
          No Presence chart active !
        </div>
      );
    }
  }
}

PresenceChart.propTypes = propTypes;
PresenceChart.defaultProps = defaultProps;

export default PresenceChart;