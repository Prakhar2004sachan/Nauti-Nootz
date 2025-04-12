const express = require("express");

const contentRouter = express.Router();

contentRouter.post("/content");

module.exports = { contentRouter };
