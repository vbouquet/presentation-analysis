import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import Grid                 from 'material-ui/Grid';
import Paper                from 'material-ui/Paper';
import PresenceChart        from './PresenceChart.jsx';
import CameraRecorder       from './CameraRecorder.jsx';


class RecordingCenter extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="component-recording-center">
        <Grid container direction="row">
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <Paper>
              <CameraRecorder />
            </Paper>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12} />
          <Grid item xs={12} />
          <Grid item xs={6}>
            <Paper style={{height: 240}}>
              <PresenceChart active={this.state.active} />
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default RecordingCenter;