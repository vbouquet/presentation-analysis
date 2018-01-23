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
import PresenceChart from '../components/PresenceChart.jsx';
import AttentivenessChart from '../components/AttentivenessChart.jsx';
import CameraRecorder from '../components/CameraRecorder.jsx';
import KeynoteGeneralStat from '../components/KeynoteGeneralStat.jsx';
import { changeMenuTitle, startRecording, stopRecording } from '../actions';

const styles = theme => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
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
      title: "Recording center - Realtime keynote analysis",
      cancelRecording: false,
      timeStart: null,
      time: "0:0:0"
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.recordTime = this.recordTime.bind(this);
  }

  componentDidMount() {
    const title = this.state.title;
    document.title = title;
    this.props.actions.changeMenuTitle(title);
  }

  componentWillUnmount() {
    this.props.actions.stopRecording();
    this.setState({ cancelRecording: false });
  }

  handleOpen() {
    this.props.actions.startRecording();
    this.setState({
      timeStart: new Date()
    }, () => { setInterval(() => this.recordTime(), 5000); });
  }

  handleClose() {
    this.setState({
      cancelRecording: true,
      timeStart: null,
      time: "0:0:0"
    });
  }

  recordTime() {
    const currentTime = new Date();
    let timeDiff = (currentTime - this.state.timeStart) / 1000;
    const seconds = Math.round(timeDiff % 60);
    timeDiff = Math.floor(timeDiff / 60);
    const minutes = Math.round(timeDiff % 60);
    timeDiff = Math.floor(timeDiff / 60);
    const hours = Math.round(timeDiff % 24);
    this.setState({time: hours + ":" + minutes + ":" + seconds});
  }

  stopRecording() {
    this.props.actions.stopRecording();
    this.setState({ cancelRecording: true });
    // TODO Forward to a summary of the keynote instead
  }

  render() {
    const { classes } = this.props;
    const { isRecording } = this.props;
    const { cancelRecording } = this.state;

    // If user canceled recording
    if (cancelRecording) {
      return (
        <Redirect to="/home" />
      )
    }
    // If not recording yet, ask the user if he wants to start the analysis
    if (!isRecording) {
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
              <Button onClick={this.handleClose}>
                Cancel
              </Button>
              <Button onClick={this.handleOpen} raised color="primary" autoFocus>
                Start
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
    // User press start recording
    return (
      <div className="component-recording-center">
        <br/><br/><br/><br/>
        <Grid container className="recording-center-grid">

          {/* Camera controls */}
          <Grid item xs={1} sm={1} md={1} xl={2}/>
          <Grid item xs={4} sm={4} md={4} xl={3}>
            <Paper className={classes.paper} elevation={6}>
              <Grid container>
                <Typography type="headline" component="h3">
                  Live recording
                </Typography>
                <br />
                <CameraRecorder isRecording={isRecording} />
                <Button className="button-recording-stop" raised color="accent"
                  onClick={this.stopRecording}>
                  Stop recording
                </Button>
              </Grid>
            </Paper>
          </Grid>
          {/* Live board stats*/}
          <Grid item xs={6} sm={6} md={6} xl={5}>
            <Paper className={classes.paper} elevation={6}>
              <Grid container>
                <Typography type="headline" component="h3">
                  Live board
                </Typography>
                <KeynoteGeneralStat time={this.state.time}/>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} xl={2}/>

          {/* Presence chart */}
          <Grid item xs={1} sm={1} md={1} xl={2}/>
          <Grid item xs={5} sm={5} md={5} xl={4}>
            <Paper className={classes.paper} elevation={6}>
              <Typography type="headline" component="h3">
                  Attendance
              </Typography>
              <PresenceChart active={isRecording} syncId="recording-center-charts" />
            </Paper>
          </Grid>

          <Grid item xs={5} sm={5} md={5} xl={4}>
            <Paper className={classes.paper} elevation={6}>
              <Typography type="headline" component="h3">
                  Attentiveness
              </Typography>
              <AttentivenessChart active={isRecording} syncId="recording-center-charts" />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} xl={2}/>

        </Grid>
      </div>
    );
  }
}

RecordingCenter = connect(mapStateToProps, mapDispatchToProps)(RecordingCenter);
RecordingCenter.propTypes = propTypes;

export default withStyles(styles)(RecordingCenter);