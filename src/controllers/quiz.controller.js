const questionService = require("../services/quiz.service");

const createQuestion = async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await questionService.updateQuestion(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const generateQuestion = async (req, res) => {
  try {
    const { subject, type, difficulty } = req.body;
    const generated = await questionService.generateQuestion({
      subject,
      type,
      difficulty,
    });
    res.status(200).json({
      success: true,
      data: generated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  generateQuestion,
};
