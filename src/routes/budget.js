const express = require("express");
const {
  getEntries,
  addEntry,
  removeEntry,
  updateEntry,
} = require("../controllers/budget.controller");

const router = express.Router();

router.get("/", getEntries);
router.post("/", addEntry);
router.put("/:id", updateEntry);
router.delete("/:id", removeEntry);

module.exports = router;
