import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PresenceChart from '../components/PresenceChart.jsx';
import CameraRecorder from '../components/CameraRecorder.jsx';
import { changeMenuTitle } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      changeMenuTitle: title => dispatch(changeMenuTitle(title))
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
      title: "Recording center - Realtime keynote analysis"
    }
  }

  componentDidMount() {
    const title = this.state.title;
    document.title = title;
    this.props.actions.changeMenuTitle(title);
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
              <PresenceChart />
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

RecordingCenter = connect(null, mapDispatchToProps)(RecordingCenter);
RecordingCenter.propTypes = propTypes;

export default RecordingCenter;