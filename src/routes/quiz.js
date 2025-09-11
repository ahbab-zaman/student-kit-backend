const express = require("express");
const router = express.Router();
const questionController = require("../controllers/quiz.controller");

router.post("/", questionController.createQuestion);
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.post("/generate", questionController.generateQuestion);

module.exports = router;
