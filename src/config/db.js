// config/db.js
const mongoose = require("mongoose");
const config = require("./index");
const logger = require("../utils/logger"); // Assumes logger.js exists (added later)

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
