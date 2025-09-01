const express = require("express");
const authMiddleware = require("../middlewares/auth");
const authRouter = require("./auth");
const classRouter = require("./classes");
const budgetRouter = require("./budget");
const studyTaskRouter = require("./studyTasks");
const todoRouter = require("./todos");
const noteRouter = require("./notes");
const questionRouter = require("./questions");
const logger = require("../utils/logger");

const apiRouter = express.Router();

// Define route configurations
const routers = [
  {
    path: "/auth",
    router: authRouter,
    middlewares: [], // No auth middleware for auth routes
  },
  {
    path: "/classes",
    router: classRouter,
    middlewares: [authMiddleware],
  },
  {
    path: "/budget",
    router: budgetRouter,
    middlewares: [authMiddleware],
  },
  {
    path: "/study-tasks",
    router: studyTaskRouter,
    middlewares: [authMiddleware],
  },
  {
    path: "/todos",
    router: todoRouter,
    middlewares: [authMiddleware],
  },
  {
    path: "/notes",
    router: noteRouter,
    middlewares: [authMiddleware],
  },
  {
    path: "/questions",
    router: questionRouter,
    middlewares: [authMiddleware],
  },
];

// Debug: Log router status
console.log("Router status:", {
  auth: !!authRouter,
  classes: !!classRouter,
  budget: !!budgetRouter,
  studyTasks: !!studyTaskRouter,
  todos: !!todoRouter,
  notes: !!noteRouter,
  questions: !!questionRouter,
});

// Dynamically attach routes
routers.forEach(({ path, router, middlewares }) => {
  if (router && typeof router === "function") {
    logger.info(`Mounting route: ${path}`);
    if (middlewares && middlewares.length > 0) {
      apiRouter.use(path, ...middlewares, router);
    } else {
      apiRouter.use(path, router);
    }
  } else {
    logger.warn(`Router for path ${path} is missing or invalid`);
  }
});

module.exports = apiRouter;
