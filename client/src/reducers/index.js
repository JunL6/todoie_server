import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import todoListReducer from "./todoListReducer";
import visibilityReducer from "./visibilityReducer";
import groupSelectedReducer from "./groupSelectedReducer";
import groupListReducer from "./groupListReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  todoList: todoListReducer,
  visibility: visibilityReducer,
  groupSelected: groupSelectedReducer,
  groupList: groupListReducer,
  form: formReducer,
  authed: authReducer,
});

export default rootReducer;
