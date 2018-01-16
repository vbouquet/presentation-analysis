import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAttentivenessStats } from '../actions';
import SimpleAreaChart from './SimpleAreaChart.jsx'

const mapStateToProps = state => {
  return {
    data: state.keynoteStats.attentivenessData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addData: (time, attention) => dispatch(addAttentivenessStats(time, attention))
    }
  };
};

const propTypes = {
  color: PropTypes.string.isRequired,
};

const defaultProps = {
  color: "#8884d8",
  syncId: null
};

class AttentivenessChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: true,
      time: 0,
      increment: 1,
      xAxisId: "time",
      yAxisId: "attention",
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
    this.props.actions.addData(this.state.time, this.randomData());
    // this.setState((prevState, props) => ({
    //   time: prevState.time + prevState.increment,
    //   data: [
    //     ...prevState.data,
    //     {
    //       "time": prevState.time + prevState.increment,
    //       "attention": this.randomData()
    //     }
    //   ]
    // }), () => { /* console.log(this.state) */ });
  }

  render() {
    const { active } = this.props;
    const { color } = this.props;
    const { syncId } = this.props;
    const label = this.state.yAxisId;
    if (active)
      return (
        <SimpleAreaChart data={this.props.data} label={label} color={color}
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

AttentivenessChart = connect(mapStateToProps, mapDispatchToProps)(AttentivenessChart);
AttentivenessChart.propTypes = propTypes;
AttentivenessChart.defaultProps = defaultProps;

export default AttentivenessChart;