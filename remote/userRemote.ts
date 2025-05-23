import requestServer from '../workers/requestServer';
import {BASE_URL, METHODS} from '../constants/API_constants';
import requestServerMultiPart from '../workers/requestServermultipart';


const req_login = 'api/login';

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


const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};
