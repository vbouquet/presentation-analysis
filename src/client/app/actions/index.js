export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_MENU_TITLE = 'CHANGE_MENU_TITLE';
export const ADD_ATTENDANCE_STATS = 'ADD_ATTENDANCE_STATS';
export const ADD_ATTENTIVENESS_STATS = 'ADD_ATTENTIVENESS_STATS';
export const RESET_ATTENDANCE_STATS = 'RESET_ATTENDANCE_STATS';
export const RESET_ATTENTIVENESS_STATS = 'RESET_ATTENTIVENESS_STATS';
export const RESET_ALL_STATS = 'RESET_ALL_STATS';
export const GET_LAST_ATTENDANCE_STATS = 'GET_LAST_ATTENDANCE_STATS';
export const GET_LAST_ATTENTIVENESS_STATS = 'GET_LAST_ATTENTIVENESS_STATS';

export function startRecording() {
    console.log("Action: startRecording");
    return { type: START_RECORDING };
}

export function stopRecording() {
    console.log("Action: stopRecording");
    return { type: STOP_RECORDING };
}

export function login(user) {
    console.log("Action: login");
    return { type: LOGIN, user: user };
}

export function logout() {
    console.log("Action: logout");
    return { type: LOGOUT };
}

export function changeMenuTitle(title) {
    console.log("Action: changeMenuTitle");
    return { type: CHANGE_MENU_TITLE, title: title};
}

export function addAttendanceStats(time, attendance) {
    console.log("Action: addAttendanceStats");
    return { type: ADD_ATTENDANCE_STATS, time: time, attendance: attendance};
}

export function addAttentivenessStats(time, attention) {
  console.log("Action: addAttentivenessStats");
  return { type: ADD_ATTENTIVENESS_STATS, time: time, attention: attention};
}

export function resetAttendanceStats() {
  console.log("Action: resetAttendanceStats");
  return { type: RESET_ATTENDANCE_STATS};
}

export function resetAttentivenessStats() {
  console.log("Action: resetAttentivenessStats");
  return { type: RESET_ATTENTIVENESS_STATS};
}

export function resetAllStats() {
  console.log("Action: resetAllStats");
  return { type: RESET_ALL_STATS};
}

export function getLastAttendanceStats() {
  console.log("Action: getLastAttendanceStats");
  return { type: GET_LAST_ATTENDANCE_STATS};
}

export function getLastAttentivenessStats() {
  console.log("Action: getLastAttentivenessStats");
  return { type: GET_LAST_ATTENTIVENESS_STATS};
}