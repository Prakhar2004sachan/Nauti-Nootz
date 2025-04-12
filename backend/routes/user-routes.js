const express = require("express");
const {
  postContent,
  getContent,
  deleteContent,
} = require("../controllers/contentController");
const { verifyController } = require("../controllers/verifyController");
const { shareLink, linkController, getShareLink } = require("../controllers/linkController");

const router = express.Router();

router.post("/add-content",verifyController, postContent);
router.get("/posts", verifyController, getContent);
router.post("/delete-content", verifyController, deleteContent);
router.get("/share/:shared", shareLink);
router.post("/share", verifyController, linkController);
router.get("/shared", verifyController, getShareLink);


module.exports = router;
