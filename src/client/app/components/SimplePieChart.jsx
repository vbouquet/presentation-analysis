import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  {name: 'Happy', value: 400},
  {name: 'Sad', value: 300},
  {name: 'Angry', value: 300},
  {name: 'Surprise', value: 200},
  {name: 'Fear', value: 200},
  {name: 'Neutral', value: 200}
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8012', '#FF8542'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Attendees: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class SimplePieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.getInitialState  = this.getInitialState.bind(this);
    this.onPieEnter       = this.onPieEnter.bind(this);
  }

  getInitialState() {
    return {activeIndex: 0};
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

	render() {
  	return (
      <ResponsiveContainer  height={300}>

    	<PieChart margin={{top: 10, right: 10, left: 10, bottom: 10}}>
        <Pie
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          dataKey="value"
          innerRadius="40%"
          outerRadius="60%"
          paddingAngle={5}
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
        >
          <Cell fill="#34A853" /> { /* Happy */}
          <Cell fill="#B953BD" /> { /* Sad */}
          <Cell fill="#EA4335" /> { /* Angry */}
          <Cell fill="#4285F4" /> { /* Surprise */}
          <Cell fill="#FBBC05" /> { /* Fear */}
          <Cell fill="#D7D3D1" /> { /* Neutral */}
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default SimplePieChart;