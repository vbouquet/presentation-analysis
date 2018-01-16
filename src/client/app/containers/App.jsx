import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from './Main.jsx';
import MenuAppBar from '../components/MenuAppBar.jsx';

const mapStateToProps = state => {
  return {
      menuTitle: state.appContext.menuTitle
  };
};

class App extends React.Component {
  render () {
    return (
      <div className="component-app">
        <MenuAppBar title={this.props.menuTitle} />
        <Main />
      </div>
    )
  }
}

App = withRouter(connect(mapStateToProps, null)(App));

export default App;