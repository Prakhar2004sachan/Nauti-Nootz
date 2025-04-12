const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const linkModel = mongoose.model("Link", linkSchema);
module.exports = linkModel;
