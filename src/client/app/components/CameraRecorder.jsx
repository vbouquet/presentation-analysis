import React                from 'react';
import ReactDOM             from 'react-dom';
import Camera               from './Camera.jsx';

navigator.getUserMedia =  navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia;

class CameraRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording:    false,
      mediaRecorder:  null,
      src:            null,
      upLoading:      false,
    };

    this.startRecording         = this.startRecording.bind(this);
    this.stopRecording          = this.stopRecording.bind(this);
    this.loadUserMedia          = this.loadUserMedia.bind(this);
    this.setUpUserMedia         = this.setUpUserMedia.bind(this);
    this.handleUserMediaError   = this.handleUserMediaError.bind(this);
  }

  /**
   * On component mount, verify if navigator support userMedia for recording
   * audio and video from hardware (webcam).
   */
  componentDidMount() {
    console.log("componentDidMount");
    if (!navigator.getUserMedia) {
      alert("Votre navigateur ne prend pas en charge l'enregistrement \
             de la webcam. Veuillez utiliser un navigateur récent comme \
             Chrome ou Firefox.");
    } else {
      this.loadUserMedia();
    }
  }

  /**
   * Load video and audio from hardware
   */
  loadUserMedia() {
    console.log("loadUserMedia");
    var mediaConstraints = {audio: true, video: true};
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.setUpUserMedia)
      .catch(this.handleUserMediaError)
  }

  /**
   * On getUserMedia success, MediaRecorder from stream
   * @param {Stream of video} stream
   */
  setUpUserMedia(stream) {
    console.log("setUpUserMedia");
    var options = { mimeType : 'video/webm' };
    var mediaRecorder = new MediaRecorder(stream, options);
    this.setState({
      mediaRecorder: mediaRecorder,
    }, () => {
      console.log("loadUserMedia: success !");
      console.log(this.state);
    });
  }

  /**
   * On getUserMedia error
   * @param {getUserMedia error} err
   */
  handleUserMediaError(err) {
    console.log("handleUserMediaError");
    console.log("loadUserMedia: failure   !");
    console.log("loadUserMedia error: " + err);
  }

  startRecording() {
    console.log("startRecording");
    if (!this.state.isRecording) {
      this.state.mediaRecorder.start();
      this.setState({
        isRecording: true,
        stream: window.URL.createObjectURL(this.state.mediaRecorder.stream),
      }, () => {
        console.log("Recording live!");
        console.log(this.state);
      });
    }
  }

  stopRecording() {
    console.log("stopRecording");
    if (this.state.isRecording) {
      this.state.mediaRecorder.stop();
      this.setState({
        isRecording: false,
        stream: "",
        msg: "ON STOP TOUT"
      }, () => {
        console.log("Recording offline!");
        console.log(this.state);
      })
    }
  }

  render() {
    return (
      <div className="component-recorder">
        <Camera src={this.state.stream} />
        <br/>
        <button className="button-recording-start"
          onClick={this.startRecording}>
          Start Recording
        </button>
        <button className="button-recording-stop"
          onClick={this.stopRecording}>
          Stop Recording
        </button>
      </div>
    )
  }
}

export default CameraRecorder;
