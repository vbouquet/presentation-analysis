import React, { Component } from 'react';
import {
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.any.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
};

const defaultProps = {
  data: [
    {"time": 0, "people": 100}
  ],
  xLabel: "time",
  yLabel: "people"
};

class SimpleAreaChart extends React.Component {
  render() {
    const { data } = this.props;
    const { yLabel } = this.props;

    return (
    <div>
      <ResponsiveContainer height={200}>
        <AreaChart
          data={data}
          margin={{top: 10, right: 20, left: 20, bottom: 0}}
        >
          <Tooltip />
          <Area type='monotone' dataKey={yLabel} stroke='#82ca9d' fill='#82ca9d' />
        </AreaChart >
      </ResponsiveContainer >
    </div>
  );
}
}

SimpleLineChart.propTypes = propTypes;
SimpleLineChart.defaultProps = defaultProps;

export default SimpleLineChart;