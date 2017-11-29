import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import Grid                 from 'material-ui/Grid';
import LoginForm            from './LoginForm.jsx';
import MenuAppBar           from './MenuAppBar.jsx';
import RecordingCenter      from './RecordingCenter.jsx';

const homeTitle = "Home";
const recordingCenterTitle = "Recording Center";

function DisplayLoginForm(isLoggedIn, callback) {
  return (
    <Grid container className="home-grid">
      <Grid item xs={4}/>
      <Grid item xs={4}>
        <LoginForm isLoggedIn={isLoggedIn} callback={callback} />
      </Grid>
      <Grid item xs={4}/>
    </Grid>
  )
}

function DisplayRecordingCenter() {
  return (
    <Grid container className="home-grid">
      <Grid item xs={2}/>
      <Grid item xs={8}>
        <RecordingCenter />
      </Grid>
      <Grid item xs={2}/>
    </Grid>
  )
};

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
      title: homeTitle,
    };
    this.handdleUserLogin = this.handdleUserLogin.bind(this);
  }

  handdleUserLogin(firstName, lastName) {
    this.setState({
      isLoggedIn: true,
      title: recordingCenterTitle,
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    var externalGrid = 4
    var mainGrid = 4;
    var display =  <LoginForm isLoggedIn={isLoggedIn} callback={this.handdleUserLogin}/>
    if (isLoggedIn) {
      externalGrid = 2;
      mainGrid = 8;
      display = <RecordingCenter />;
    }

    return (
      <div className="component-home">
        <MenuAppBar title={this.state.title}/>
        <Grid container className="home-grid">
          <Grid item xs={externalGrid}/>
          <Grid item xs={mainGrid}>
            {display}
          </Grid>
          <Grid item xs={externalGrid}/>
        </Grid>
      </div>
    );
  }
}

export default Home;