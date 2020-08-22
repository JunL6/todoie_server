import { STATUS_ALL } from "../utils/const";
import { SWITCH_VISIBILITY } from "../actions/types";

export default function(visibility = STATUS_ALL, action) {
  switch (action.type) {
    case SWITCH_VISIBILITY:
      console.log("clicked toggle: " + action.payload);
      return action.payload;
    default:
      return visibility;
  }
}
