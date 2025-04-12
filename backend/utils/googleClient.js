const { google } = require("googleapis");

console.log("Client ID:", process.env.GOOGLE_CLIENT_ID),
console.log("Client Secret:", process.env.GOOGLE_CLIENT_SECRET),

exports.oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);
