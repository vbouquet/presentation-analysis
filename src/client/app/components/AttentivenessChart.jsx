import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleAreaChart from './SimpleAreaChart.jsx'

const propTypes = {
  color: PropTypes.string.isRequired,
};

const defaultProps = {
  color: "#8884d8",
  syncId: null
}

class AttentivenessChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: true,
      time: 4,
      increment: 1,
      xAxisId: "time",
      yAxisId: "attention",
      data: [
        {"time": 0, "attention": 45},
        {"time": 1, "attention": -20},
        {"time": 2, "attention": 10},
      ]
    };
  }

  randomData() {
    return Math.floor(Math.random() * (200) + 1) - 100;
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
          "attention": this.randomData()
        }
      ]
    }), () => { /* console.log(this.state) */ });
  }

  render() {
    const { active } = this.props;
    const { color } = this.props;
    const { syncId } = this.props;
    const label = this.state.yAxisId;
    if (active)
      return (
        <SimpleAreaChart data={this.state.data} label={label} color={color}
                         syncId={syncId} fillColorByValue
        />
      );
    else {
      return (
        <div>
          No AttentivenessChart active
        </div>
      );
    }
  }
}

AttentivenessChart.propTypes = propTypes;
AttentivenessChart.defaultProps = defaultProps;

export default AttentivenessChart;