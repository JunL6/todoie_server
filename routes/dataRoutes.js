const mongoose = require("mongoose");
const log = require("../utils/logging");

const User = mongoose.model("User");

module.exports = (app) => {
  app.get("/api/getUserData", (req, res) => {
    log(`[/api/getUserData] ${req.user._id}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      User.findById(req.user._id).exec((err, userDoc) => {
        if (err) {
          console.error(err);
          res.send(`error has occured.`);
        } else {
          res.json(userDoc);
        }
      });
    }
  });

  app.post("/api/insertTodo", (req, res) => {
    log(`[/api/insertTodo] ${req.user._id}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      const { groupId, todoContent, timeCreated, ...rest } = req.body;
      User.findById(req.user._id).exec((err, userDoc) => {
        if (err) {
          console.error(err);
          res.send(`error has occured.`);
        } else {
          userDoc.todos.push({
            groupId,
            todoContent,
            isCompleted: false,
            timeCreated,
          });
          userDoc.save((err) => {
            if (err) {
              console.error(err);
            } else {
              res.send("todo inserted");
            }
          });
        }
      });
    }
  });

  app.post("/api/updateTodo", (req, res) => {
    log(`[update todo] ${req.user._id}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    } else {
      const { todoId, isToggled, newTodoContent } = req.body;

      User.findById(req.user._id).exec((err, userDoc) => {
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

        // console.log(userDoc.todos);
        userDoc.save((err) => {
          if (err) console.error(err);
          else res.send(`todo item updated!`);
        });
      });
    }
  });

  app.post("/api/addGroup", (req, res) => {
    log(`[add group] ${req.user._id}`);
    if (!req.user) {
      return res.status(401).send("Not authorized");
    }

    const { groupName, timeCreated } = req.body;
    User.findById(req.user._id).exec((err, userDoc) => {
      if (err) {
        console.error(err);
        return res.send(`error has occurred during DB executions`);
      } else {
        userDoc.groups.push({
          groupName,
          timeCreated,
        });

        userDoc.save((err, newUserDoc) => {
          if (err) {
            console.error(err);
            return res.send(`error occurred during DB saving`);
          } else {
            res.send(newUserDoc.groups[newUserDoc.groups.length - 1]);
          }
        });
      }
    });
  });
};
