import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import PresenceChart        from './PresenceChart.jsx';

function CameraRecording(props) {
  if (props.active) {
    return (
      <div className="camera-recording">
        Recording Active !
      </div>
    );
  }
  return null;
}


class RecordingCenter extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="component-recording-center">
        <CameraRecording active />
        <PresenceChart active />
      </div>
    );
  }
}

export default RecordingCenter;