require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const authRoute = require("./routes/authRoute.js");
const postContent = require("./routes/user-routes.js");

// dotenv.config();
connectDB();
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "https://nauti-nootz.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/api", postContent);
app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from serverless!" });
});

const port = 3000;
app.listen(port, ()=>{
  console.log(`server is running on ${port} port`)
})