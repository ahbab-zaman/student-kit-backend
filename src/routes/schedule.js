const express = require("express");
const scheduleController = require("../controllers/schedule.controller");

const router = express.Router();

// CRUD Routes
router.post("/", scheduleController.create);
router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getOne);
router.put("/:id", scheduleController.update);
router.delete("/:id", scheduleController.remove);

// Extra route - get schedules by day
router.get("/day/:day", scheduleController.getByDay);

module.exports = router;
