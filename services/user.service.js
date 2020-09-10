const mongoose = require("mongoose");

const User = mongoose.model("User");

async function getUser(userID) {
  return await User.findOne({ userID });
}

/* 为何这里要用async await: 因为要return一个promise */
async function insertTodo(userID, groupId, todoContent, timeCreated) {
  return await User.findOne({ userID })
    .then(async (userDoc) => {
      userDoc.todos.push({
        groupId,
        todoContent,
        isCompleted: false,
        timeCreated,
      });
      return await userDoc.save();
    })
    .catch((err) => {
      console.error(err);
      throw Error(`can't find user document`);
    });
}

async function addGroup(userID, groupName, timeCreated) {
  return await User.findOne({ userID })
    .then(async (userDoc) => {
      userDoc.groups.push({
        groupName,
        timeCreated,
      });
      let newUserDoc = await userDoc.save();
      return newUserDoc.groups[newUserDoc.groups.length - 1];
    })
    .catch((err) => {
      console.error(err);
      throw Error(`can't find user document`);
    });
}

module.exports = { getUser, insertTodo, addGroup };
