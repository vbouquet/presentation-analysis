import React          from 'react';
import ReactDOM       from 'react-dom';
import Home           from './Home.jsx';

class App extends React.Component {
  render () {
      return (
        <div className="component-app">
          <Home />
        </div>
      )
  }
}

export default App;