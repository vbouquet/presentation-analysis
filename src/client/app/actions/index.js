export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_MENU_TITLE = 'CHANGE_MENU_TITLE';

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