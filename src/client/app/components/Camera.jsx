import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

class Camera extends React.Component {

  render() {
    const { status, src } = this.props;
    if (this.refs.video) {
      if (status === "recording") {
        console.log("play !!")
        this.refs.video.play();
      }
      else if (status === "paused") {
        console.log("pause !!")
        this.refs.video.pause();
      }
    }
    return (
      // TODO add poster image to video to display loading properly
      <div className="component-camera">
        {src ? (
          <video className="video-live-streaming"
            autoPlay="true" muted src={src} width="100%" height="auto"
            ref="video"/>
        ) : (
          <CircularProgress />
        )}
      </div>
    )
  }
}

export default Camera;