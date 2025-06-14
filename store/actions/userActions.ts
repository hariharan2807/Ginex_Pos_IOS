/* eslint-disable prettier/prettier */
import store from '../../store';
import {
  SAVE_IP,
  SAVE_JWT_TOKEN,
  VALUE_DATE,
  INCREASE_COUNT,
  DECREASE_COUNT,
  USER_INFO,
  REPORT_LIST_DATA,
  UPDATE_CART,
  HANDLE_ERROR,
} from './actionTypes';
import {errorBox} from 'workers/utils';

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
export const updateCart = (payload: []) => ({
  type: UPDATE_CART,
  payload,
});
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
export const incrementAction = (payload: any) => {
  // console.log("incrementAction",payload)
  return async (dispatch: any) => {
    try {
      const oldCartState = store.getState().user.cart;
      const AppControlState = store.getState().app.app_controll;
      const isIteminCart = oldCartState.findIndex(
        (item: any) => item.uuid === payload.uuid,
      );
      if (isIteminCart !== -1) {
        let newCartObj = oldCartState[isIteminCart];
        // if (
        //   parseInt(AppControlState?.maximum_quantity_limit) >
        //   newCartObj.quantity
        // ) {
        newCartObj.quantity++;
        oldCartState.splice(isIteminCart, 1, newCartObj);
        let newCart: any = [...oldCartState];
        dispatch(updateCart(newCart));
        // } else {
        //   errorBox('Maximum quantity reached');
        // }
      } else {
        let newCartObj = {...payload};
        newCartObj.quantity = 1;
        let newCart: any = [...oldCartState, newCartObj];
        dispatch(updateCart(newCart));
      }
    } catch (err) {
      console.log(err);
      dispatch(handleError(`incrementAction()`));
    }
  };
};

export const decrementAction = (uuid: any) => {
  return async (dispatch: any) => {
    try {
      const oldCartState = store.getState().user.cart;
      const indexOnCart = oldCartState.findIndex(
        (item: any) => item.uuid === uuid,
      );
      if (indexOnCart !== -1) {
        if (oldCartState[indexOnCart].quantity === 1) {
          oldCartState.splice(indexOnCart, 1);
          let newCart: any = [...oldCartState];
          dispatch(updateCart(newCart));
        } else {
          let newCartObj = {...oldCartState[indexOnCart]};
          newCartObj.quantity--;
          oldCartState.splice(indexOnCart, 1, newCartObj);
          let newCart: any = [...oldCartState];
          dispatch(updateCart(newCart));
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(handleError(`Decrement Action()`));
    }
  };
};
export const handleError = (payload: string) => ({
  type: HANDLE_ERROR,
  payload,
});
