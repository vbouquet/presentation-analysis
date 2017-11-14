import React, { Component }               from 'react';
import ReactDOM                           from 'react-dom';
import {LineChart, Line, XAxis, YAxis,
        CartesianGrid, Tooltip,
        ResponsiveContainer, Legend}      from 'recharts';

class DataWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      data: [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
      ]
    }
  }

  insertData() {
    this.setState((prevState, props) => ({
      index: prevState.index + 1,
      data:  [
        ...prevState.data,
        {name: 'Page ' + prevState.index + 1, uv: 3490, pv: 4300, amt: 2100}
      ]
    }));
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.insertData(),
      2000
    );
  }

  render() {
  	return (
    	<SimpleLineChart data={this.state.data}/>
    )
  }
}


class SimpleLineChart extends React.Component {
	render () {
  	return (
    	<ResponsiveContainer height={ 200 }>
  			<LineChart data={this.props.data}
                   margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                   syncId="anyId">
         <XAxis
           height={ 30 }
           dataKey="created"
           stroke="black"
           style={{ fontSize: '12px' }}
           tickLine={ false }
           axisLine={ false }
           padding={{ top: 10 }}
          />
         <YAxis
           width={ 20 }
           stroke="black"
           style={{ fontSize: '12px' }}
           tickLine={ false }
           axisLine={ false }
          />
          <Legend />
          <Line type="natural" dataKey="uv" stroke="red" dot={{ r: 0 }}
            activeDot={{ r: 4, strokeWidth: 0 }} isAnimationActive={ false }/>
          <Line type="natural" dataKey="pv" stroke="green" dot={{ r: 0 }}
            activeDot={{ r: 4, strokeWidth: 0 }} isAnimationActive={ false }/>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

ReactDOM.render(
	<div>
  <DataWrapper />
  </div>,
  document.getElementById('app')
);
