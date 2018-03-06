import React from 'react';
import Camera from './Camera.jsx';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { addAttendanceStats, addAttentivenessStats } from "../actions/";

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addAttendanceData: (time, attendees) => dispatch(addAttendanceStats(time, attendees)),
      addAttentivenessData: (time, attention) => dispatch(addAttentivenessStats(time, attention))
    }
  };
};

class CameraRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "inactive",
      // Utilitaire pour enregistrer la video/audio (https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
      mediaRecorder: null,
      // Temps entre chaque segment video/audio enregistré (ms)
      // timeBetweenVideoSlice: 5000,
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
    // Nombre de requête au serveur pour suivre l'évolution des réponses
    // TODO Le changer pour le mettre côté serveur
    this.counter = 1;

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.pauseOrResumeRecording = this.pauseOrResumeRecording.bind(this);
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
    console.log("componentDidMount CameraRecorder");
    // Ajout de la référence de se composant pour le composant père qui peut
    // ensuite appeler les méthodes d'ici
    this.props.onRef(this);
    this.loadUserMedia();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount CameraRecorder");
    this.props.onRef(undefined);
    this.state.mediaRecorder.stop();
    window.URL.revokeObjectURL(this.state.stream);
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
    alert("Impossible de démarrer l'enregistrement. \
          Vérifiez que votre navigateur est à jour, et que vous utilisez  \
          un navigateur supporté: Chrome-47.0+ ou Firefox-25.0+");
    console.log("handleUserMediaError");
    console.log("loadUserMedia: failure   !");
    console.log("loadUserMedia error: " + err);
  }

  startRecording() {
    console.log("StartRecording")
    const { status, mediaRecorder/*, timeBetweenVideoSlice*/ } = this.state;
    const timeBetweenVideoSlice = this.props.timerInterval;

    if (status == null || status === "inactive") {
      console.log("startRecording");
      mediaRecorder.start(timeBetweenVideoSlice);
      const stream = window.URL.createObjectURL(mediaRecorder.stream);

      this.setState({
        status: "recording",
        stream: stream,
      });

      // Listener pour envoyer le flux audio/video au serveur par paquet
      mediaRecorder.addEventListener("dataavailable", (event) => this.sendVideoToServer(event));
    }
  }

  sendVideoToServer(event) {
    const { mediaRecorder } = this.state;
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

    const addAttendanceData = this.props.actions.addAttendanceData;
    const addAttentivenessData = this.props.actions.addAttentivenessData;
    const time = this.props.time;

    // Réponse du serveur (asynchrone)
    function listenerServerResponse() {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        console.log("serverResponse");
        console.log(this.response);
        console.log(this);

        if (this.response) {
          const json_response = JSON.parse(this.response);
          const attendance = parseInt(json_response.attendance);
          const attentiveness = parseInt(json_response.attentiveness)

          addAttendanceData(time, attendance);
          // TODO Real attentiveness Data
          addAttentivenessData(time, attentiveness);
        }
      }
    }
  };

  stopRecording() {
    console.log("stopRecording !");
    const { mediaRecorder, stream } = this.state;
    // const { stream } = this.state;
    if (mediaRecorder != null && mediaRecorder != undefined && mediaRecorder.state !== "inactive") {
      console.log("stopRecording not inactive !")
      mediaRecorder.stop();
      window.URL.revokeObjectURL(stream);

      this.setState({
        status: "inactive",
        // stream: window.URL.revokeObjectURL(stream),
      });
    }
  }

  pauseOrResumeRecording() {
    console.log("pauseOrResumeRecording")
    const { mediaRecorder } = this.state;
    if (mediaRecorder != null && mediaRecorder.state !== "inactive") {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        this.setState({
          status: "paused"
        })
      } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        this.setState({
          status: "recording"
        })
      }
    }
  }

  render() {
    const { stream, status } = this.state;
    return (
      <div className="component-recorder">
        <Camera src={stream} status={status}/>
      </div>
    )
  }
}

CameraRecorder = connect(null, mapDispatchToProps)(CameraRecorder);
export default CameraRecorder;
