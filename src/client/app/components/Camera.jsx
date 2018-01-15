import React from 'react';

const propTypes = {
  src: PropTypes
};

function Camera({ src }) {
  return (
    <div className="component-camera">
      <video className="video-live-streaming"
        autoPlay="true" controls src={src} />
    </div>
  );
}

Camera.propTypes = propTypes;

export default Camera;