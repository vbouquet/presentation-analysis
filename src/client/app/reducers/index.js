import { combineReducers } from 'redux';
import recordingCenter from './recordingCenter';
import userAuth from './userAuth';
import appContext from './appContext';
import keynoteStats from './keynoteStats';

const rootReducer = combineReducers({
  userAuth,
  recordingCenter,
  appContext,
  keynoteStats,
});

export default rootReducer;