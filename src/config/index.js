// config/index.js
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key_here",
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
      ],
};
