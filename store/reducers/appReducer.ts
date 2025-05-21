/* eslint-disable prettier/prettier */
import {
  APPCONTROLL,
  HANDLE_ERROR,
  SAVE_IP,
  SUPER_ADMIN_DETAILS,
  USER_LOCATION,
} from '../actions/actionTypes';
import {Save_Admin_Details} from '../actions/appActions';

const initialState = {
  error: null,
  ip: null,
  app_controll: null,
  location: null,
  admin_details: null,
};

interface actionShape {
  type: string;
  payload: any;
}

const App = (state = initialState, action: actionShape): any => {
  switch (action.type) {
    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SAVE_IP:
      return {
        ...state,
        ip: action.payload,
      };
    case APPCONTROLL:
      return {
        ...state,
        app_controll: action.payload,
      };
    case SUPER_ADMIN_DETAILS:
      return {
        ...state,
        admin_details: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};

export default App;
