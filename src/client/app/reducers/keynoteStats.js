import {
  ADD_ATTENDANCE_STATS,
  ADD_ATTENTIVENESS_STATS,
  RESET_ATTENDANCE_STATS,
  RESET_ATTENTIVENESS_STATS,
  RESET_ALL_STATS,
  GET_LAST_ATTENTIVENESS_STATS,
  GET_LAST_ATTENDANCE_STATS,
  ADD_EMOTION_STATS
} from '../actions';

const initialState = {
  attendanceData: [],
  attentivenessData: [],
  emotionsData: [
    {name: 'Happy', value: 0},
    {name: 'Sad', value: 0},
    {name: 'Angry', value: 0},
    {name: 'Surprise', value: 0},
    {name: 'Fear', value: 0},
    {name: 'Neutral', value: 0}
  ]
};

function keynoteStats(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTENDANCE_STATS:
      return Object.assign({}, state, {
        attendanceData: [
          ...state.attendanceData,
          {
            time: action.time,
            attendees: action.attendees
          }
        ]
      });
    case ADD_ATTENTIVENESS_STATS:
      return Object.assign({}, state, {
        attentivenessData: [
          ...state.attentivenessData,
          {
            time: action.time,
            attention: action.attention
          }
        ]
      });
    case ADD_EMOTION_STATS:
      return Object.assign({}, state, {
      emotionsData: [
        { name: 'Happy',     value: action.emotions.happy },
        { name: 'Sad',       value: action.emotions.sad },
        { name: 'Angry',     value: action.emotions.angry },
        { name: 'Surprise',  value: action.emotions.surprise },
        { name: 'Fear',      value: action.emotions.fear },
        { name: 'Neutral',   value: action.emotions.neutral },
      ]
    });
    case RESET_ATTENDANCE_STATS:
      return Object.assign({}, state, {
        attendanceData: []
      });
    case RESET_ATTENTIVENESS_STATS:
      return Object.assign({}, state, {
        attentivenessData: []
      });
    case RESET_ALL_STATS:
      return Object.assign({}, state, {
        attendanceData: [],
        attentivenessData: []
      });
    case GET_LAST_ATTENDANCE_STATS:
      return Object.assign({}, state, {
        "attendance": state.attendanceData[state.attendanceData.length-1]
      });
    case GET_LAST_ATTENTIVENESS_STATS:
      return Object.assign({}, state, {
        "attentiveness": state.attentivenessData[state.attentivenessData.length-1]
      });
    default:
      return state;
  }
}

export default keynoteStats;