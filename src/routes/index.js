const express = require("express");
// const authMiddleware = require("../middlewares/auth");
const authRouter = require("./auth");
const classRouter = require("./classes");
const budgetRouter = require("../routes/budget");
const studyTaskRouter = require("./studyTasks");
const todoRouter = require("./todo");
const scheduleRouter = require("./schedule");
const quizRouter = require("./quiz");
const logger = require("../utils/logger");

const apiRouter = express.Router();

// Define route configurations
const routers = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/classes",
    router: classRouter,
  },
  {
    path: "/budget",
    router: budgetRouter,
  },
  {
    path: "/study-tasks",
    router: studyTaskRouter,
  },
  {
    path: "/todos",
    router: todoRouter,
  },
  {
    path: "/schedule",
    router: scheduleRouter,
  },
  {
    path: "/quizzes",
    router: quizRouter,
  },
];

// Debug: Log router status
console.log("Router status:", {
  auth: !!authRouter,
  classes: !!classRouter,
  budget: !!budgetRouter,
  studyTasks: !!studyTaskRouter,
  todos: !!todoRouter,
  schedules: !!scheduleRouter,
  quizzes: !!quizRouter,
});

// Dynamically attach routes
routers.forEach(({ path, router, middlewares }) => {
  if (router && router.use) {
    if (middlewares && middlewares.length > 0) {
      apiRouter.use(path, ...middlewares, router);
    } else {
      apiRouter.use(path, router);
    }
  } else {
    console.warn(`Router for path ${path} is missing or invalid`);
  }
});

module.exports = apiRouter;
