const mongoose = require("mongoose");
const log = require("../utils/logging");
const { getUser, insertTodo, addGroup } = require("../services/user.service");

const User = mongoose.model("User");

module.exports = (app) => {
  app.get("/api/getUserData", (req, res) => {
    const { userID } = req.user;
    log(`[/api/getUserData] userID: ${userID}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      getUser(req.user.userID)
        .then((userDoc) => {
          res.json(userDoc);
        })
        .catch((err) => {
          console.error(err);
          res.send(`[error]: can't get user data`);
        });
    }
  });

  app.post("/api/insertTodo", (req, res) => {
    const { userID } = req.user;
    log(`[/api/insertTodo] userID: ${userID}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      const { groupId, todoContent, timeCreated, ...rest } = req.body;

      insertTodo(userID, groupId, todoContent, timeCreated)
        .then(() => {
          res.send("todo inserted");
        })
        .catch((err) => {
          console.error(err);
          res.send(`error has occurred: ${err}`);
        });
    }
  });

  /* todo: refactor this code to user.service.js */
  app.post("/api/updateTodo", (req, res) => {
    const { userID } = req.user;
    log(`[update todo] userID: ${userID}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      const { todoId, isToggled, newTodoContent } = req.body;

      User.findOne({ userID: req.user.userID }).exec((err, userDoc) => {
        if (err) {
          console.error(err);
          return res.send(`error has occurred during DB executions`);
        }

        if (!todoId) {
          console.error(`todoId not provided`);
          return res.send(`todoId not provided`);
        }

        if (isToggled) {
          userDoc.todos.forEach((todo) => {
            if (todo._id.toString() === todoId) {
              todo.isCompleted = !todo.isCompleted;
            }
          });
        }

        if (newTodoContent) {
          userDoc.todos.forEach((todo) => {
            if (todo._id === todoId) {
              todo.todoContent = newTodoContent;
            }
          });
        }

        userDoc.save((err) => {
          if (err) console.error(err);
          else res.send(`todo item updated!`);
        });
      });
    }
  });

  app.post("/api/addGroup", (req, res) => {
    const { userID } = req.user;
    log(`[add group] ${userID}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    }

    const { groupName, timeCreated } = req.body;

    addGroup(userID, groupName, timeCreated)
      .then((newGroup) => res.send(newGroup))
      .catch((err) => {
        console.error(err);
        res.send(`error has occurred: ${err}`);
      });

    // User.findOne({ userID: req.user.userID }).exec((err, userDoc) => {
    //   if (err) {
    //     console.error(err);
    //     return res.send(`error has occurred during DB executions`);
    //   } else {
    //     userDoc.groups.push({
    //       groupName,
    //       timeCreated,
    //     });

    //     userDoc.save((err, newUserDoc) => {
    //       if (err) {
    //         console.error(err);
    //         return res.send(`error occurred during DB saving`);
    //       } else {
    //         res.send(newUserDoc.groups[newUserDoc.groups.length - 1]);
    //       }
    //     });
    //   }
    // });
  });
};
