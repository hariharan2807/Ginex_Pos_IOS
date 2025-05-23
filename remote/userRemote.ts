import requestServer from '../workers/requestServer';
import {BASE_URL, METHODS} from '../constants/API_constants';
import requestServerMultiPart from '../workers/requestServermultipart';


const req_login = 'api/login';
const req_my_profile = 'api/my_profile';

//OnlY POST
//Get query key

export const getLoginremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_login,
      payload,
    );
    console.log("response",response?.data?.data)
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

export const getMyProfileremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_my_profile,
      // {status:params.queryKey[1]},
      params
    );
    console.log("response",response?.data?.data)
    return response.status === 200
      ? response?.data?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    console.log("err",err)
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
