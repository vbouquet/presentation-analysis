import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import LogginForm           from './LogginForm.jsx';

class Home extends React.Component {
  render() {
    const title = "Bienvenue sur l'outil d'analyse de présentation !";
    return (
      <div className="component-home">
        <h1> {title} </h1>
        <LogginForm />
      </div>
    );
  }
}

export default Home;