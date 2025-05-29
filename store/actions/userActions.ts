/* eslint-disable prettier/prettier */
import {
  SAVE_IP,
  SAVE_JWT_TOKEN,
  VALUE_DATE,
  INCREASE_COUNT,
  DECREASE_COUNT,
  USER_INFO,
  REPORT_LIST_DATA,
} from './actionTypes';

export const saveIpAction = (payload: string) => ({
  type: SAVE_IP,
  payload,
});

export const saveJWTTokenAction = (payload: any) => ({
  type: SAVE_JWT_TOKEN,
  payload,
});
export const SaveDate = (payload: any) => ({
  type: VALUE_DATE,
  payload,
});

// actions.js

export const increaseCount = (payload: any) => ({
  type: INCREASE_COUNT,
  payload,
});

export const decreaseCount = (payload: any) => ({
  type: DECREASE_COUNT,
  payload,
});
export const SaveUserInfo = (payload: any) => ({
  type: USER_INFO,
  payload,
});
export const SaveReportdata = (payload: any) => ({
  type: REPORT_LIST_DATA,
  payload,
});
