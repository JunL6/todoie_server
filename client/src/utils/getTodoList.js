import { STATUS_ALL, STATUS_TODO, STATUS_DONE } from "./const";

export default function getTodoListFromSelection(
  fullList,
  visibility,
  currentGroupId
) {
  switch (visibility) {
    case STATUS_ALL:
      return fullList.filter((todo) => todo.groupId === currentGroupId);
    case STATUS_TODO:
      return fullList.filter(
        (todo) => todo.groupId === currentGroupId && todo.isCompleted === false
      );
    case STATUS_DONE:
      return fullList.filter(
        (todo) => todo.groupId === currentGroupId && todo.isCompleted === true
      );
  }
}
