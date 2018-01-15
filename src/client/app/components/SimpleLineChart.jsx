import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis,
        CartesianGrid, Tooltip,
        ResponsiveContainer, Legend} from 'recharts';
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

function SimpleLineChart({ data, xLabel, yLabel }) {
  return (
    <div>
      <ResponsiveContainer height={200}>
        <LineChart
          data={data}
          margin={{top: 10, right: 20, left: 20, bottom: 0}}
        >
          <Tooltip />
          <XAxis
            height={30}
            stroke="black"
            style={{fontSize: '12px' }}
            tickLine={false}
            axisLine
            xAxisId={xLabel}
            padding={{top: 10}}
          />
          <YAxis
            width={20}
            stroke="black"
            style={{fontSize: '12px'}}
            tickLine={false}
            axisLine
            yAxisId={yLabel}
          />
          <Line
            type="natural"
            dataKey={yLabel}
            stroke="red"
            dot={{r: 0}}
            activeDot={{r: 4, strokeWidth: 0}}
            isAnimationActive={false}
          />
        </LineChart >
      </ResponsiveContainer >
    </div>
  );
}

SimpleLineChart.propTypes = propTypes;
SimpleLineChart.defaultProps = defaultProps;

export default SimpleLineChart;