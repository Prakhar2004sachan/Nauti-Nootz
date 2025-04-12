const { contentModel } = require("../model/contentModel");
const linkModel = require("../model/linkModel");
const userModel = require("../model/user-model");
const random = require("../utils/hashFun");

const linkController = async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await linkModel.findOne({ userId: req.user._id });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(30);
    await linkModel.create({
      userId: req.user._id,
      hash,
    });

    res.json({
      hash,
    });
  } else {
    await linkModel.deleteOne({
      userId: req.user._id,
    });

    res.json({
      message: "Removed Link",
    });
  }
};

// GET /api/share
const getShareLink = async (req, res) => {
  const existingLink = await linkModel.findOne({ userId: req.user._id });

  if (existingLink) {
    res.json({ hash: existingLink.hash });
  } else {
    res.status(404).json({ message: "No link found" });
  }
};


const shareLink = async (req, res) => {
  try {
    const hash = req.params.shared; // ✅ fixed typo

    const link = await linkModel.findOne({ hash });

    if (!link) {
      return res.status(400).json({ message: "incorrect input" });
    }

    const content = await contentModel.find({ userId: link.userId });
    const user = await userModel.findById(link.userId);

    if (!user) {
      return res.status(411).json({
        message: "user not found, error should ideally not happen",
      });
    }

    return res.json({
      username: user.username,
      content,
    });
  } catch (err) {
    console.error("Error in shareLink:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports  = {linkController, shareLink,getShareLink}