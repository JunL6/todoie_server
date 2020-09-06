const mongoose = require("mongoose");

const User = mongoose.model("User");

async function getUser(userID) {
  return await User.findOne({ UserID });
}
