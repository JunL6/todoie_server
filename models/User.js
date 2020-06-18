const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const log = require("../utils/logging");
const { Schema } = mongoose;

/* bcrypt variables */
const saltRounds = 10;

const TodoSchema = new Schema({
  groupId: String,
  todoContent: String,
  isCompleted: Boolean,
  timeCreated: Date,
});

const GroupSchema = new Schema({
  groupName: String,
  timeCreated: Date,
});

const userSchema = new Schema({
  username: String,
  password: String,
  todos: [TodoSchema],
  groups: [GroupSchema],
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  /* generate hash and replace password */
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return console.error(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.verifyPassword = function (pwd, cb) {
  bcrypt.compare(pwd, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

mongoose.model("User", userSchema);
