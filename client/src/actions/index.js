import axios from "axios";

import {
  ADD_TODOITEM,
  TOGGLE_TODOITEM,
  SWITCH_VISIBILITY,
  SELECT_GROUP,
  ADD_GROUP,
  FETCH_USER,
  AUTH_USER,
} from "./types";
import { URL_FETCH_USER } from "../config/urls";

let nextTodoId = 0;
let nextGroupId = 1;

export function fetchUser() {
  return (dispatch) => {
    axios
      .get(URL_FETCH_USER)
      .then((response) => {
        console.log(response);
        dispatch({ type: FETCH_USER, payload: response.data.username });
      })
      .catch((err) => console.error(err));
  };
}

export function authUser(username) {
  return {
    type: AUTH_USER,
    payload: username,
  };
}

export const addTodoItem = (text, timestamp, currentGroupId) => {
  return {
    type: ADD_TODOITEM,
    payload: {
      id: nextTodoId++,
      text,
      timeCreated: timestamp,
      isCompleted: false,
      groupId: currentGroupId,
    },
  };
};

export const toggleTodoItem = (id) => {
  return {
    type: TOGGLE_TODOITEM,
    payload: id,
  };
};

export const switchVisibility = (visibility) => {
  return { type: SWITCH_VISIBILITY, payload: visibility };
};

export const selectGroup = (groupId) => {
  return {
    type: SELECT_GROUP,
    payload: groupId,
  };
};

export const addGroup = (groupName) => {
  return {
    type: ADD_GROUP,
    payload: {
      groupName,
      groupId: nextGroupId++,
    },
  };
};

/* authentication related */
