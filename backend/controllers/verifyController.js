const jwt = require("jsonwebtoken");

exports.verifyController = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  console.log("Verify-Controller");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
