import axios from "axios";

import constants from "src/constants";
import {SET_USER, REMOVE_USER} from 'src/actions/types';
import AjaxUtils from "src/utils/AjaxUtils";




// Form data to be send to backend for user login/register
// type - one of the login/register
export const setUser = ( formData, type, successCallback  ) => (dispatch) => {
  let action;
  if(type === 'register'){
    action = axios.post(constants.APIs.registerUser, formData);
  } else if (type === 'login'){
    action = axios.post(constants.APIs.loginUser, formData);
  } else if(type === 'get_user') {
    action = axios.get(constants.APIs.loginUser);
  }
  action.then((resp) => {
    dispatch ({
      type: SET_USER,
      payload: {currentUser: resp.data}
    });
    successCallback && successCallback()

  }).catch((e) => {
    console.log(e);
    if(type !== 'get_user'){
      // For get user we want to silently supress the error if occurs.
      AjaxUtils.showBackendErrors(e.response);
    }
  });
};


export const removeUser = () => async (dispatch) => {

  try {
    await axios.post(constants.APIs.logout);
    dispatch ({
      type: REMOVE_USER
    });
  } catch (e) {
    AjaxUtils.showBackendErrors(e.response);
  }
};