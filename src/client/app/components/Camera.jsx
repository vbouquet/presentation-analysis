import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

function Camera({ src }) {
  return (
    <div className="component-camera">
      {src ? (
        <video className="video-live-streaming"
          autoPlay="true" controls src={src} width="100%" height="auto"/>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Camera;