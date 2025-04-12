require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const { connectDB } = require("../config/db.js");
const authRoute = require("../routes/authRoute.js");
const postContent = require("../routes/user-routes.js");

// dotenv.config();
connectDB();
const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api", postContent);
app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from serverless!" });
});

module.exports = app;
module.exports.handler = serverless(app); 