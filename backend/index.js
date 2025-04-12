require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const authRoute = require("./routes/authRoute");
const postContent = require("./routes/user-routes");

// dotenv.config();
connectDB();
const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api", postContent);

const port = 3000;
app.listen(port, () => {
  console.log("server is running");
});
