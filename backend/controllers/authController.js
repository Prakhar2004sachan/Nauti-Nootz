const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const userModel = require("../model/user-model.js");
const { google } = require("googleapis");

exports.googleAuth = async (req, res, next) => {
  const { code } = req.body;
  console.log("🔐 Google code received:", code);
  if (!code) return res.status(400).json({ error: "No code provided" });
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const userinfo = await oauth2.userinfo.get();
    console.log(userinfo);
    const { email, name, picture } = userinfo.data;
    const username =
      name.toLowerCase().replace(/\s+/g, "") +
      Math.floor(Math.random() * 10000);
    let user = await userModel.findOne({ email });
    if (!user) {
      user = new userModel({ email, name, image: picture,username });
      await user.save();
    }
    const { _id } = user;
    const token = jwt.sign({ _id, user}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    console.error("Google Auth Error:", err.message, err.response?.data || "");

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
