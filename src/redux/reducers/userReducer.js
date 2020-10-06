import {
  ADD_USER_SUCCESS, UPDATE_USER_SUCCESS, GET_ALL_USERS, DELETE_USER_SUCCESS
} from "../../constants/ActionTypes";


let INTIAL_STATE = {
  assignmentData: [],
  loading: false,
  users: localStorage.getItem("WS-ALL-USERS") === null ? [] : JSON.parse(localStorage.getItem("WS-ALL-USERS"))
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {

    case ADD_USER_SUCCESS:

      let usersArray = JSON.parse(localStorage.getItem("WS-ALL-USERS")) !== null ? JSON.parse(localStorage.getItem("WS-ALL-USERS")) : []

      usersArray.push(action.payload)

      localStorage.setItem("WS-ALL-USERS", JSON.stringify(usersArray));

      return { ...state, users: usersArray, };

    case UPDATE_USER_SUCCESS:

      let usersUpdtingArray = localStorage.setItem("WS-ALL-USERS", JSON.stringify(action.payload));

      return { ...state, users: usersUpdtingArray, };

    case GET_ALL_USERS:

      return { ...state, users: localStorage.getItem("WS-ALL-USERS") === null ? [] : JSON.parse(localStorage.getItem("WS-ALL-USERS")), };

    case DELETE_USER_SUCCESS:

      let users = JSON.parse(localStorage.getItem("WS-ALL-USERS")) !== null ? JSON.parse(localStorage.getItem("WS-ALL-USERS")) : []

      let filteredArray = users.filter(d => d._id !== action.payload)

      localStorage.setItem("WS-ALL-USERS", JSON.stringify(filteredArray));

      return { ...state, users: filteredArray };

    default:

      return { ...state };
  }
};
