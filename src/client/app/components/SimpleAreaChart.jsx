import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const propTypes = {
  data: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

class SimpleAreaChart extends React.Component {
  render() {
    const { data } = this.props;
    const { label } = this.props;
    const { color } = this.props;

    return (
      <div>
        <ResponsiveContainer height={200}>
          <AreaChart data={data} margin={{top: 10, right: 20, left: 20, bottom: 0}}>
            <Tooltip />
            <Area type='monotone' dataKey={label} stroke={color} fill={color} />
          </AreaChart >
        </ResponsiveContainer >
      </div>
    );
  }
}

SimpleAreaChart.propTypes = propTypes;

export default SimpleAreaChart;