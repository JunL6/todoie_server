import { ADD_GROUP } from "../actions/types";

export default function(
  groupList = [
    { groupName: "Default Group", groupId: -1 },
    {
      groupName: "Group 2",
      groupId: -2
    }
  ],
  action
) {
  switch (action.type) {
    case ADD_GROUP:
      console.log("here is being executed");
      return [...groupList, action.payload];
    default:
      return groupList;
  }
}
