import {
  START_RECORDING,
  STOP_RECORDING
} from '../actions';

const initialState = {
  isRecording: false
};

function recordingCenter(state = initialState, action) {
  switch (action.type) {
    case START_RECORDING:
      return Object.assign({}, state, {
        isRecording: true
      });
    case STOP_RECORDING:
      return Object.assign({}, state, {
        isRecording: false
      });
    default:
      return state;
  }
}

export default recordingCenter;