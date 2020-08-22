import { SELECT_GROUP } from "../actions/types";

const INITIAL_GROUP = -1;

export default function(currentGroupId = INITIAL_GROUP, action) {
  switch (action.type) {
    case SELECT_GROUP:
      return action.payload;
    default:
      return currentGroupId;
  }
}
