import {
  ADD_ATTENDANCE_STATS,
  ADD_ATTENTIVENESS_STATS,
  RESET_ATTENDANCE_STATS,
  RESET_ATTENTIVENESS_STATS,
  RESET_ALL_STATS,
  GET_LAST_ATTENTIVENESS_STATS,
  GET_LAST_ATTENDANCE_STATS
} from '../actions';

const initialState = {
  attendanceData: [],
  attentivenessData: [],
};

function keynoteStats(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTENDANCE_STATS:
      return Object.assign({}, state, {
        attendanceData: [
          ...state.attendanceData,
          {
            "time": action.time,
            "people": action.people
          }
        ]
      });
    case ADD_ATTENTIVENESS_STATS:
      return Object.assign({}, state, {
        attentivenessData: [
          ...state.attentivenessData,
          {
            "time": action.time,
            "attention": action.attention
          }
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