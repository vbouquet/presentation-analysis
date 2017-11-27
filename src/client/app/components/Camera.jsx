import React                from 'react';
import ReactDOM             from 'react-dom';

class Camera extends React.Component {
  render() {
    return (
      <div className="component-camera">
        <video className="video-live-streaming"
          autoPlay="true" controls src={this.props.src} />
      </div>
    )
  }
}

export default Camera;