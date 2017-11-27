import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import PresenceChart        from './PresenceChart.jsx';
import CameraRecorder       from './CameraRecorder.jsx';

class RecordingCenter extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="component-recording-center">
        <CameraRecorder />
        <PresenceChart active />
      </div>
    );
  }
}

export default RecordingCenter;