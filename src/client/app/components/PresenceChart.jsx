import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAttendanceStats } from "../actions/";
import SimpleAreaChart from './SimpleAreaChart.jsx'

const mapStateToProps = state => {
  return {
    data: state.keynoteStats.attendanceData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addData: (time, attendees) => dispatch(addAttendanceStats(time, attendees))
    }
  };
};

const propTypes = {
  color: PropTypes.string.isRequired,
};

const defaultProps = {
  color: "#82ca9d",
  syncId: null
};

class PresenceChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: true,
      time: 0,
      yAxisId: "attendees",
    };
  }

  randomData() {
    return Math.floor(Math.random() * (100) + 1);
  }

  componentDidMount() {
    // this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  tick() {
    // this.props.actions.addData(this.state.time+1, this.randomData());
  }

  render() {
    const { active } = this.props;
    const { color } = this.props;
    const { syncId } = this.props;
    const label = this.state.yAxisId;
    if (active)
      return (
        <SimpleAreaChart data={this.props.data} label={label} color={color}
                         syncId={syncId} fillColorByValue={false}
        />
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

PresenceChart = connect(mapStateToProps, mapDispatchToProps)(PresenceChart);
PresenceChart.propTypes = propTypes;
PresenceChart.defaultProps = defaultProps;

export default PresenceChart;