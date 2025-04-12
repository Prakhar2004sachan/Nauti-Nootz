const express = require("express");
const Router = express.Router();
const { googleAuth } = require("../controllers/authController");
const { verifyController } = require("../controllers/verifyController");

Router.post("/google", googleAuth);
Router.get("/verify", verifyController, (req, res) => {
  // req.user will have the decoded payload
  res.status(200).json(req.user);
});

module.exports = Router;
