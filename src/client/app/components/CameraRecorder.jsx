import React from 'react';
import Camera from './Camera.jsx';

navigator.getUserMedia =  navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia;

class CameraRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      // Utilitaire pour enregistrer la video/audio (https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
      mediaRecorder: null,
      // Temps entre chaque segment video/audio enregistré (ms)
      timeBetweenVideoSlice: 5000,
      // Flux video comme URL Object (https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
      stream: null,
      // Les options d'enregistrement de MediaRecorder
      options: {
        // Format de la video
        mimeType: "video/webm",
        // Qualité de la vidéo et de l'audio (700 KB/s)
        bitsPerSecond: 700000
      },
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.loadUserMedia = this.loadUserMedia.bind(this);
    this.setUpUserMedia = this.setUpUserMedia.bind(this);
    this.handleUserMediaError = this.handleUserMediaError.bind(this);
    this.sendVideoToServer = this.sendVideoToServer.bind(this);
  }

  /**
   * Lorsque le composant est monté, vérifie que le navigateur supporte l'enregistrement video
   * et audio grâce à MediaRecorder
   */
  componentDidMount() {
    console.log("componentDidMount");
    if (!navigator.getUserMedia) {
      alert("Votre navigateur ne prend pas en charge l'enregistrement \
             de la video par votre webcam depuis le navigateur. \
             Veuillez utiliser un navigateur récent comme \
             Chrome ou Firefox.");
    } else {
      this.loadUserMedia();
    }
  }

  componentWillUnmount() {
    this.stopRecording();
  }

  /**
   * Chargement de la video et de l'audio
   */
  loadUserMedia() {
    console.log("loadUserMedia");
    let mediaConstraints = {audio: true, video: true};
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.setUpUserMedia)
      .then(this.startRecording)
      .catch(this.handleUserMediaError);
  }

  /**
   * On getUserMedia success, MediaRecorder from stream
   */
  setUpUserMedia(stream) {
    console.log("setUpUserMedia");
    const { options } = this.state;
    let mediaRecorder = new MediaRecorder(stream, options);
    this.setState({
      mediaRecorder: mediaRecorder,
    });
  }

  handleUserMediaError(err) {
    console.log("handleUserMediaError");
    console.log("loadUserMedia: failure   !");
    console.log("loadUserMedia error: " + err);
  }

  startRecording() {
    const { isRecording } = this.state;
    const { mediaRecorder } = this.state;
    const { timeBetweenVideoSlice } = this.state;

    if (!isRecording) {
      console.log("startRecording");
      mediaRecorder.start(timeBetweenVideoSlice);
      let stream = window.URL.createObjectURL(mediaRecorder.stream);

      this.setState({
        isRecording: true,
        stream: stream,
      });

      // Listener pour envoyer le flux audio/video au serveur par paquet
      mediaRecorder.addEventListener("dataavailable", (event) => this.sendVideoToServer(event));
    }
  }

  sendVideoToServer(event) {
    const { mediaRecorder } = this.state;
    const { timeBetweenVideoSlice } = this.state;
    const { mimeType } = this.state.options;

    const file = new File([event.data],
      "video-" + (new Date).toISOString().replace(/[:.]/g, '-') + ".webm",
      { type: mimeType }
    );

    const request = new XMLHttpRequest();
    // Ajout listener réponse de la requête (asynchrone)
    request.addEventListener('readystatechange', listenerServerResponse);
    request.open('POST', "http://localhost:8000/snippets/", true);

    let data = new FormData();
    data.append("title", "send-file");
    data.append("file", file);
    data.append("filename", file.name);
    request.send(data);

    // Réponse du serveur (asynchrone) => ISSUE NOT WORKING
    function listenerServerResponse() {
      console.log("ServerResponse");
      console.log(this);
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        console.log(this.response);
      }
    }
  };

  stopRecording() {
    console.log("stopRecording");
    if (this.state.isRecording) {

      this.state.mediaRecorder.stop();

      // Libère la mémoire associé au fichier video
      window.URL.revokeObjectURL(this.state.stream);

      this.setState({
        isRecording: false,
        stream: "",
      });
    }
  }

  render() {
    return (
      <div className="component-recorder">
        <Camera src={this.state.stream} />
      </div>
    )
  }
}

export default CameraRecorder;
