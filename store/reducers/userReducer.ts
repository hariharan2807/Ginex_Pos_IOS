/* eslint-disable prettier/prettier */
import {
  DECREASE_COUNT,
  HANDLE_ERROR,
  INCREASE_COUNT,
  REPORT_LIST_DATA,
  SAVE_IP,
  SAVE_JWT_TOKEN,
  USER_INFO,
  VALUE_DATE,
} from '../actions/actionTypes';

const initialState = {
  error: null,
  ip: null,
  jwt_token: null,
  valuedate: null,
  count: 20,
  user_info: null,
  report_list: null,
};

interface actionShape {
  type: string;
  payload: any;
}

const User = (state = initialState, action: actionShape): any => {
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
    case SAVE_JWT_TOKEN: {
      return {
        ...state,
        jwt_token: action.payload,
      };
    }
    case VALUE_DATE: {
      return {
        ...state,
        valuedate: action.payload,
      };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        count: action.payload + 1,
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        count: action.payload - 1,
      };
    }
    case USER_INFO: {
      return {
        ...state,
        user_info: action.payload,
      };
    }
    case REPORT_LIST_DATA: {
      console.log("report_list-=-=-=",action.payload,state)
      return {
        ...state,
        report_list: action.payload,
      };
    }

    default:
      return state;
  }
};

export default User;
