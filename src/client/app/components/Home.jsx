import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import LogginForm           from './LogginForm.jsx';
import MenuAppBar           from './MenuAppBar.jsx';

class Home extends React.Component {
  render() {
    return (
      <div className="component-home">
        <MenuAppBar />
        <br/> <br/> <br/> <br/> <br/>
        <LogginForm />
      </div>
    );
  }
}

export default Home;