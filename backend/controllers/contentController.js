const { contentModel } = require("../model/contentModel");

const postContent = async (req, res) => {
  const { title, link, type, description,date } = req.body;
  const user = req.user;
  if (!title ||!type ) {
    return res.status(400).json({ message: "Missing required fields" });
  }
   if (!user || !user._id) {
     return res.status(401).json({ message: "Unauthorized. User not found." });
   }
  try {
    const newPost = new contentModel({
      link,
      type,
      description,
      title,
      date,
      userId: user._id,
    });
    await newPost.save();
    res.json({
      message: "Content added",
    });
  } catch (error) {
    res.json({
      message: "Content not added",
    });
    console.log(error);
  }
};

const getContent = async (req, res) => {
  const user = req.user;
  const userId = user._id;
  console.log(userId);
  if (!userId)
    return res.status(400).json({ message: "You are not logged in" });
  try {
    const content = await contentModel
      .find({
        userId: userId,
      })
      .populate("userId", "username");
    res.json({
      content,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting the posts",
    });
    console.log(error);
  }
};

const deleteContent = async (req, res) => {
  try {
    const contentId = req.body.contentId;
    const user = req.user;

    const deleted = await contentModel.findOneAndDelete({
      _id: contentId,
      userId: user._id,
    });

    if (!deleted) {
      return res
        .status(403)
        .json({ message: "Not authorized or content not found." });
    }

    res.status(200).json({ message: "Content deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { postContent, getContent, deleteContent };
