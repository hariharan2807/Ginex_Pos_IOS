import requestServer from '../workers/requestServer';
import {BASE_URL, METHODS} from '../constants/API_constants';
import requestServerMultiPart from '../workers/requestServermultipart';

const req_login = 'api/login';
const req_my_profile = 'api/my_profile';
const req_check_report_password = 'api/check_report_password';
const req_change_password='api/change_password'
const req_printer_sizes='api/printer_sizes'
const req_edit_profile='api/edit_profile'
//OnlY POST
//Get query key

export const getLoginremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_login,
      payload,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getCheckReportPasswordremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_report_password,
      payload,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getPrinterListremote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_printer_sizes,
      // payload,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getChangePasswordremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_change_password,
      payload,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getMyProfileremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_my_profile,
      // {status:params.queryKey[1]},
      params,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    console.log('err', err);
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditProfileremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_edit_profile,
      params,
    );
    console.log('response', response?.data?.data);
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    console.log('err', err);
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};
