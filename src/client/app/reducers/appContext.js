import {
  CHANGE_MENU_TITLE,
} from '../actions';

const initialState = {
  menuTitle: "Realtime keynote analysis"
};

function appContext(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MENU_TITLE:
      return Object.assign({}, state, {
        menuTitle: action.title
      });
    default:
      return state;
  }
}

export default appContext;