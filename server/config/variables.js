const path = require("path");

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../.env"),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb_user: process.env.MONGODB_USERNAME,
  mongodb_password: process.env.MONGODB_PASSWORD,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};
