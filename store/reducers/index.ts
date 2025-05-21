
import { combineReducers } from 'redux';

import app from './appReducer';
import user from './userReducer';
// import pickup from './pickUpDropReducer';

export const rootReducer = combineReducers({
  app,
  user,
  // pickup
});

export type RootState = ReturnType<typeof rootReducer>