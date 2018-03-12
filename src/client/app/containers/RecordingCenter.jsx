import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Dialog,
{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import StopIcon from 'material-ui-icons/Stop';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import green from 'material-ui/colors/green';
import PresenceChart from '../components/PresenceChart.jsx';
import AttentivenessChart from '../components/AttentivenessChart.jsx';
import CameraRecorder from '../components/CameraRecorder.jsx';
import KeynoteGeneralStat from '../components/KeynoteGeneralStat.jsx';
import { changeMenuTitle, startRecording, stopRecording } from '../actions';

import SimpleLinePieChart from '../components/SimplePieChart.jsx';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  tet: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  greenButton: {
    margin: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

const mapStateToProps = state => {
  return {
    isRecording: state.recordingCenter.isRecording,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      changeMenuTitle: title => dispatch(changeMenuTitle(title)),
      startRecording: () => dispatch(startRecording()),
      stopRecording: () => dispatch(stopRecording()),
    }
  };
};

const propTypes = {
  actions: PropTypes.shape({
    changeMenuTitle: PropTypes.func.isRequired
  })
};

class RecordingCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Status de la présentation: inactive, recording, paused, stopped
      status: "inactive",
      // Date with time of keynote's beginning
      timeStart: null,
      time: "00:00:00",
    };

    this.timer = null;
    this.timerInterval = 10000;
    this.title = "Recording center - Realtime keynote analysis";
    // Reference to the camera recorder child, use this to play, pause etc.
    this.cameraRecorderRef = null;

    this.startKeynote = this.startKeynote.bind(this);
    this.cancelKeynote = this.cancelKeynote.bind(this);
    this.stopKeynote = this.stopKeynote.bind(this);
    this.resumeKeynote = this.resumeKeynote.bind(this);
    this.pauseKeynote = this.pauseKeynote.bind(this);
    this.pauseKeynote = this.pauseKeynote.bind(this);
    this.resumeKeynote = this.resumeKeynote.bind(this);
    this.recordTime = this.recordTime.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    document.title = this.title;
    this.props.actions.changeMenuTitle(this.title);
  }

  componentWillUnmount() {
    this.stopTimer();
    if (this.cameraRecorderRef) {
      this.cameraRecorderRef.stopRecording();
    }
    // TODO clean up CameraRecorder
  }

  recordTime() {
    const currentTime = new Date();
    let timeDiff = (currentTime - this.state.timeStart) / 1000;
    let seconds = Math.round(timeDiff % 60);
    timeDiff = Math.floor(timeDiff / 60);
    let minutes = Math.round(timeDiff % 60);
    timeDiff = Math.floor(timeDiff / 60);
    let hours = Math.round(timeDiff % 24);
    if (seconds < 10) seconds = "0" + seconds;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    this.setState({time: hours + ":" + minutes + ":" + seconds});
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startKeynote() {
    const timerInterval = this.timerInterval;
    this.props.actions.startRecording();
    this.setState({
      status: 'recording',
      timeStart: new Date()
    }, () => {
      this.timer = setInterval(() => this.recordTime(), timerInterval);
    });
  }

  cancelKeynote() {
    this.setState({
      status: 'cancelled',
      timeStart: null,
      time: "00:00:00"
    });
  }

  stopKeynote() {
    if (this.cameraRecorderRef) {
      console.log("stopKeynote");
      this.props.actions.stopRecording();
      this.setState({
        status: 'stopped'
      });
      this.stopTimer();
    }
  }

  resumeKeynote() {
    if (this.cameraRecorderRef) {
      console.log("resumeKeynote");
      this.cameraRecorderRef.pauseOrResumeRecording();
    }
  }

  pauseKeynote() {
    if (this.cameraRecorderRef) {
      console.log("pauseKeynote");
      this.cameraRecorderRef.pauseOrResumeRecording();
      // TODO pause timer
    }
  }

  render() {
    const { classes, isRecording } = this.props;
    const { status } = this.state;

    // If user canceled recording
    if (status === 'stopped' || status === 'cancelled') {
      return (
        <Redirect to="/home" />
      )
    }
    // If not recording yet, ask the user if he wants to start the analysis
    if (status === 'inactive') {
      return (
        <div>
          <Dialog open>
            <DialogTitle id="start-recording-title">Start recording ?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you continue the live keynote analysis will start now.<br/>
                Make sure your browser is up-to-date and that your camera is properly setup.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancelKeynote}>
                Cancel
              </Button>
              <Button onClick={this.startKeynote} variant="raised" color="primary" autoFocus>
                Start
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
    // User is recording a live keynote
    return (
      <div className="component-recording-center">
        <br/><br/><br/><br/>
        <Grid container className="recording-center-grid" className={classes.root}>

          {/* Button controls to play/pause/stop keynote */}
          <Grid item xs={1} sm={3} md={4} xl={5} />
          <Grid item xs={10} sm={7} md={4} xl={3}>
              <Grid container>
                <Button className="button-recording-stop" variant="raised" color="secondary"
                        onClick={this.stopKeynote} className={classes.button}>
                  <StopIcon className={classes.icon} />
                </Button>
                <Button className="button-recording-stop" variant="raised"
                        onClick={this.resumeKeynote} className={classes.greenButton}>
                  <PlayArrowIcon className={classes.icon} />
                </Button>
                <Button className="button-recording-stop" variant="raised"
                        onClick={this.pauseKeynote} className={classes.button}>
                  <PauseIcon className={classes.icon} />
                </Button>
              </Grid>
          </Grid>
          <Grid item xs={1} sm={2} md={4} xl={4}/>

          {/* Camera live streaming */}
          <Grid item xs={1} sm={1} md={1} xl={1}/>
          <Grid item xs={3} sm={3} md={3} xl={3}>
            <Paper className={classes.paper} elevation={6}>
              <Grid container>
                <Typography variant="headline" component="h3">
                  Live recording
                </Typography>
                <CameraRecorder isRecording={isRecording} time={this.state.time}
                  timerInterval={this.timerInterval}
                  onRef={ref => (this.cameraRecorderRef = ref)}/>
              </Grid>
            </Paper>
          </Grid>

          {/* Live board stats*/}
          <Grid item xs={2} sm={2} md={2} xl={2}>
            <Paper className={classes.paper} elevation={6}>
              <Grid container>
                <Typography variant="headline" component="h3">
                  Live board
                </Typography>
                  <KeynoteGeneralStat time={this.state.time}/>
              </Grid>
            </Paper>
          </Grid>

          { /* Emotion pie chart */}
          <Grid item xs={5} sm={5} md={5} xl={5}>
            <Paper className={classes.paper} elevation={6}>
              <Typography variant="headline" component="h3">
                  Emotions
              </Typography>
              <SimpleLinePieChart />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} xl={1}/>

          {/* Presence chart */}
          <Grid item xs={1} sm={1} md={1} xl={1}/>
          <Grid item xs={5} sm={5} md={5} xl={5}>
            <Paper className={classes.paper} elevation={6}>
              <Typography variant="headline" component="h3">
                  Attendance
              </Typography>
              <PresenceChart active={isRecording} syncId="recording-center-charts" />
            </Paper>
          </Grid>

          <Grid item xs={5} sm={5} md={5} xl={5}>
            <Paper className={classes.paper} elevation={6}>
              <Typography variant="headline" component="h3">
                  Attentiveness
              </Typography>
              <AttentivenessChart active={isRecording} syncId="recording-center-charts" />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} xl={5}/>

        </Grid>
      </div>
    );
  }
}

RecordingCenter = connect(mapStateToProps, mapDispatchToProps)(RecordingCenter);
RecordingCenter.propTypes = propTypes;

export default withStyles(styles)(RecordingCenter);