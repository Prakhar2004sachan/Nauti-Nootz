const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: String,
  type: { type: String, required: true, enum: ["youtube", "twitter", "document"] },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date : {type: Date, required: true}
});

const contentModel = mongoose.model("Content", contentSchema);

module.exports = { contentModel };
