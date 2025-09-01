// src/server.js
const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const PORT = config.port;

app.listen(PORT, async () => {
  try {
    await connectDB(); // Connect to MongoDB
    logger.info(
      `Server is alive on PORT:${PORT} in ${config.nodeEnv} environment`
    );
  } catch (err) {
    logger.error("❌ Error during startup:", err);
    process.exit(1);
  }
});

// Handle process events
process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down...");
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    logger.error("Error while closing MongoDB connection:", error);
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down...");
  process.exit(0);
});

process.on("unhandledRejection", (error) => {
  logger.error("🔴 UNHANDLED REJECTION! Server shutting down...", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logger.error("🔴 UNCAUGHT EXCEPTION! Server shutting down...", error);
  process.exit(1);
});
