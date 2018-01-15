import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RecordingCenter from './RecordingCenter.jsx';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const defaultProps = {
  isLoggedIn: false
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userAuth.isLoggedIn
  };
};

class Main extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    console.log("Main: isLoggedIn = " + isLoggedIn);
    return (
      <div className="component-main">
        <Switch>
          <PrivateRoute exact path='/' component={Home} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/home' component={Home} isLoggedIn={isLoggedIn} />
          <Route path='/login' component={LoginForm} />
          <PrivateRoute path='/recording-center' component={RecordingCenter} isLoggedIn={isLoggedIn} />
        </Switch>
      </div>
    )
  }
}

// Redirect to login form if not logged in
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log("PrivateRoute => " + isLoggedIn);
  return (
    <Route {...rest} render={props => (
      isLoggedIn ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

Main = withRouter(connect(mapStateToProps, null)(Main));

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;