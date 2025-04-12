const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  username: { type: String, unique: true },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
