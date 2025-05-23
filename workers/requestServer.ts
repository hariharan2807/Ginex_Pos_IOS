// import {METHODS} from '../constants/API_constants';
// import NetInfo from '@react-native-community/netinfo';
// import store from '../store/index';
// import {
//   getTokenuser,
//   removePersistedUser,
//   removeTokenUser,
//   SaveToken,
// } from './localStorage';
// import {saveJWTTokenAction} from '../store/actions/userActions';
// import RNRestart from 'react-native-restart';
// import {errorBox} from './utils';

// const requestServer = function (
//   method: string,
//   url: string,
//   payload?: any,
// ): any {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), 300000);
//   return new Promise(async (resolve, reject) => {
//     //for token
//     let token = store.getState().user.jwt_token;
//     console.log("token",token)
//     if (!token) {
//       const sinfoToken = await getTokenuser();
//       console.log("sinfoToken",sinfoToken)
//       token = sinfoToken;
//     }

//     let options: any = {
//       signal: controller.signal,
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     };
//     if (method === METHODS.POST || method === METHODS.GET) {
//       options.body = JSON.stringify(payload);
//     }

//     fetch(url, options)
//       .then(async serverResponse => {
//         //header to senf JWT token
//         const header = serverResponse.headers.get('authorization');

//         if (header) {
//           // replace a new token
//           await SaveToken(header);
//           store.dispatch(saveJWTTokenAction(header));
//         }

//         clearTimeout(timeoutId);
//         if (serverResponse.ok) {
//           logRequest(url, payload);
//           if (serverResponse.headers.get('content-length') === '0') {
//             resolve({status: serverResponse.status});
//           } else {
//             serverResponse
//               .json()
//               .then(data => {
//                 // console.log("satsttat", data)
//                 resolve({status: serverResponse.status, data});
//               })
//               .catch(err => {
//                 // console.log("satsttat", serverResponse)
//                 ErrorRequest(url, payload);
//                 reject('Parse Failed');
//               });
//           }
//         } else {
//           console.log("serverResponse",serverResponse?.body)
//           if (serverResponse.status === 401) {
//             setTimeout(() => {
//               errorBox('Session expired Please Login Again');
//             }, 2000);
//             await removeTokenUser();
//             await removePersistedUser();
//             // await removeFCMToken();
//             RNRestart.Restart();
//           }

//           ErrorRequest(url, payload);
//           serverResponse.json().then(data => {
//             reject({status: false, statusCode: serverResponse.status, data});
//           });
//         }
//       })
//       .catch(err => {
//         clearTimeout(timeoutId);
//         ErrorRequest(url, payload);
//         reject({status: false, err});
//       });
//   });
// };

// export default requestServer;

// const logRequest = (url: string, payload: any) => {
//   console.log(`\x1b[32m  Request ${url} : ${JSON.stringify(payload)} \x1b[0m`);
// };
// const ErrorRequest = (url: string, payload: any) => {
//   console.log(
//     `\x1b[33m [*ERROR*] Request ${url} : ${JSON.stringify(payload)} \x1b[0m`,
//   );
// };

/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  getTokenuser,
  removePersistedUser,
  removeTokenUser,
  SaveToken,
} from './localStorage';
import {Bluelog, METHODS, Redlog} from '../constants/API_constants';
import store from '../store/index';
// import {saveJWTTokenAction} from '@actions/userActions';
import {saveJWTTokenAction} from '../store/actions/userActions';
import {errorBox} from './utils';
import RNRestart from 'react-native-restart';
const requestServer = function (
  method: string,
  url: string,
  payload?: any,
): any {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  return new Promise(async (resolve, reject) => {
    //for token
    //let token = store.getState().user.jwt_token;
    let token = store.getState().user.Btoken;
    if (!token) {
      const sinfoToken = await getTokenuser();
      token = sinfoToken;
      store.dispatch(saveJWTTokenAction(sinfoToken));
      Bluelog('s info Token', sinfoToken);
    }

    // Bluelog('token',token)
    let options: any = {
      signal: controller.signal,
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    if (method === METHODS.POST || method === METHODS.GET) {
      options.body = JSON.stringify(payload);
    }

    try {
      fetch(url, options)
        .then(async serverResponse => {
          //header to senf JWT token
          // const header = serverResponse.headers.get('authorization');
          // if (header) {
          //   Bluelog('Inrequest server header.ok',header)
          //   if(false){
          //     await saveToken(header);
          //     store.dispatch(UpdateTokenData(header));
          //   }

          // }
          clearTimeout(timeoutId);
          // Pinklog('serverResponse.ok',serverResponse.ok)
          if (serverResponse.ok) {
            logRequest(url, payload);
            if (serverResponse.headers.get('content-length') === '0') {
              resolve({status: serverResponse.status});
            } else {
              serverResponse
                .json()
                .then(data => {
                  // console.log("satsttat", data)
                  resolve({status: serverResponse.status, data});
                })
                .catch(err => {
                  // console.log("satsttat", serverResponse)
                  ErrorRequest(url, payload);
                  reject('Parse Failed');
                });
            }
          } else {
            if (serverResponse.status === 401) {
              errorBox('Session expired Please Login Again');
              await removePersistedUser();
              await removeTokenUser();
              // await removeNotification();
              // await removeCustomerType();
              setTimeout(async () => {
                RNRestart.Restart();
              }, 4000);
            }

            console.log('>> Status: ', serverResponse?.status);
            ErrorRequest(url, payload);

            serverResponse
              .json()
              .then(data => {
                // console.log('data-----', data);
                reject({
                  status: false,
                  statusCode: serverResponse.status,
                  data,
                });
              })
              .catch(err => {
                reject({status: false, statusCode: serverResponse.status, err});
              });
          }
        })
        .catch(err => {
          clearTimeout(timeoutId);
          ErrorRequest(url, payload);
          reject({status: false, err});
        });
    } catch (err) {
      Redlog('Requestserver failed', err);
      clearTimeout(timeoutId);
      ErrorRequest(url, payload);
      reject({status: false, err});
    }
  });
};

export default requestServer;

const logRequest = (url: string, payload: any) => {
  console.log(`\x1b[32m  Request ${url} : ${JSON.stringify(payload)} \x1b[0m`);
};
const ErrorRequest = (url: string, payload: any) => {
  console.log(
    `\x1b[33m [*ERROR*] Request ${url} : ${JSON.stringify(payload)} \x1b[0m`,
  );
};
