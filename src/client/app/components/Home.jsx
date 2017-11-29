import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import LogginForm           from './LogginForm.jsx';
import MenuAppBar           from './MenuAppBar.jsx';
import PropTypes            from 'prop-types';
import Grid                 from 'material-ui/Grid';

class Home extends React.Component {
  render() {
    return (
      <div className="component-home">
        <MenuAppBar />
        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/> <br/>
        <Grid container className="home-grid">
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <LogginForm />
          </Grid>
          <Grid item xs={4}/>
        </Grid>
      </div>
    );
  }
}

export default Home;