// src/app.js
const express = require("express");
const cors = require("cors");
const config = require("./config");
const logger = require("./utils/logger");
const errorMiddleware = require("./middlewares/error");
const apiRouter = require("./routes");
const app = express();

console.log("✅ Express app initialized");

// CORS configuration
app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Parse JSON bodies
app.use(express.json({ limit: "20mb" }));

// Log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Student Life Toolkit API",
    status: "success",
  });
});

// Root API endpoint
app.use("/api/v1", apiRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use(errorMiddleware);

module.exports = app;
