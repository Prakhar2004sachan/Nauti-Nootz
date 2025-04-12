require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const authRoute = require("./routes/authRoute.js");
const postContent = require("./routes/user-routes.js");

// dotenv.config();
connectDB();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://nauti-nootz.vercel.app", // prod
];

// app.use(cors());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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