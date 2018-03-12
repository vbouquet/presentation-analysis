import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleAreaChart from './SimpleAreaChart.jsx'

const mapStateToProps = state => {
  return {
    data: state.keynoteStats.attentivenessData
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
      yAxisId: "attention",
    };
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

AttentivenessChart = connect(mapStateToProps, null)(AttentivenessChart);
AttentivenessChart.propTypes = propTypes;
AttentivenessChart.defaultProps = defaultProps;

export default AttentivenessChart;