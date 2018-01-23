import {
  LOGIN,
  LOGOUT
} from '../actions';

const initialState = {
  isLoggedIn: false,
  user: null
};

function userAuth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.user
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: null
      });
    default:
      return state;
  }
}

export default userAuth;