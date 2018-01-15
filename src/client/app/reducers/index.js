import { combineReducers } from 'redux';
import recordingCenter from './recordingCenter';
import userAuth from './userAuth';
import appContext from './appContext';

const rootReducer = combineReducers({
  userAuth,
  recordingCenter,
  appContext,
});

export default rootReducer;