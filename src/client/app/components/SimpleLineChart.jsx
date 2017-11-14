import React, { Component }               from 'react';
import ReactDOM                           from 'react-dom';
import {LineChart, Line, XAxis, YAxis,
        CartesianGrid, Tooltip,
        ResponsiveContainer, Legend}      from 'recharts';


class SimpleLineChart extends React.Component {
	render () {
  	return (
      <div>
    	  <ResponsiveContainer height={200}>
  		  	<LineChart
            data={this.props.data}
            margin={{top: 10, right: 20, left: 20, bottom: 0}}
          >
            <Tooltip />
            <XAxis
              height={30}
              stroke="black"
              style={{fontSize: '12px' }}
              tickLine={false}
              axisLine
              xAxisId={this.props.xAxisId}
              padding={{top: 10}}
            />
            <YAxis
              width={20}
              stroke="black"
              style={{fontSize: '12px'}}
              tickLine={false}
              axisLine
              yAxisId={this.props.yAxisId}
            />
            <Line
              type="natural"
              dataKey="people"
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
}

export default SimpleLineChart;