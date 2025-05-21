/* eslint-disable prettier/prettier */
import {APPCONTROLL, SAVE_IP, SUPER_ADMIN_DETAILS, USER_LOCATION} from './actionTypes';

export const saveIpAction = (payload: string) => ({
  type: SAVE_IP,
  payload,
});
export const Save_Appcontrol_Data = (payload: any) => ({
  type: APPCONTROLL,
  payload,
});
export const Save_UserLocation = (payload: any) => ({
  type: USER_LOCATION,
  payload,
});
export const Save_Admin_Details = (payload: any) => ({
  type: SUPER_ADMIN_DETAILS,
  payload,
});