import {
  ADD_USER_SUCCESS, GET_ALL_USERS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS
} from "../../constants/ActionTypes";
import OpenNotification from "../../components/OpenNotification";

;
export const getAllUserData = (users, props) => {
  return dispatch => {
    //here we can call api to
    //temporory storedata
    dispatch({ type: GET_ALL_USERS });


  }

};
export const addUserData = (users, props) => {
  return dispatch => {
    //here we can call api to
    //temporory storedata
    dispatch({ type: ADD_USER_SUCCESS, payload: users });
    OpenNotification({
      type: "success",
      title: "User Added Successfully"
    });

  }

};
export const updateUserData = (users, props) => {
  return dispatch => {
    //here we can call api to
    //temporory update data
    dispatch({ type: UPDATE_USER_SUCCESS, payload: users });
    OpenNotification({
      type: "success",
      title: "User updated Successfully"
    });

  }

};
export const deleteUser = (id) => {
  return dispatch => {
    //here we can call api to
    //temporory update data
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    OpenNotification({
      type: "success",
      title: "User Deleted Successfully"
    });

  }

};