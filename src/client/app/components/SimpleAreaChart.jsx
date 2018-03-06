import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const propTypes = {
  data: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fillColorByValue: PropTypes.bool.isRequired,
};

const defaultProps = {
  data: [
    {"x": 5, "y": 0},
    {"x": 10, "y": 1},
  ],
  label: "x",
  color: "gree",
  fillColorByValue: false,
};

class SimpleAreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillColorByValue: false,
    };
    this.gradientOffset = this.gradientOffset.bind(this);
  }

  gradientOffset() {
    const { data } = this.props;
    const { label } = this.props;
    const dataMax = Math.max(...data.map((i) => i[label]));
    const dataMin = Math.min(...data.map((i) => i[label]));

    if (dataMax <= 0){
      return 0
    }
    else if (dataMin >= 0){
      return 1
    }
    else {
      return dataMax / (dataMax - dataMin);
    }
  }

  render() {
    const { data } = this.props;
    const { label } = this.props;
    const { color } = this.props;
    const { syncId } = this.props;
    const fillColorByValue = this.props.fillColorByValue;
    const gradientOff = this.gradientOffset();

    return (
      <div>
        <ResponsiveContainer height={200}>
          <AreaChart data={data} margin={{top: 10, right: 20, left: 20, bottom: 0}} syncId={syncId}>
          {/* TODO Make XAxis dataKey a props */}
            <XAxis dataKey="time" />
            <Tooltip />
            <defs>
              { fillColorByValue ? (
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={gradientOff} stopColor={color} stopOpacity={1}/>
                  <stop offset={gradientOff} stopColor="red" stopOpacity={1}/>
                </linearGradient>
                ) : null
              }
            </defs>
            <Area type='monotone' dataKey={label} stroke={color}
                  fill={ fillColorByValue ? 'url(#splitColor)' : color } />
          </AreaChart >
        </ResponsiveContainer >
      </div>
    );
  }
}

SimpleAreaChart.propTypes = propTypes;
SimpleAreaChart.defaultProps = defaultProps;

export default SimpleAreaChart;