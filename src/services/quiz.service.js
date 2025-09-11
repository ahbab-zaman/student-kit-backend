const Question = require("../models/quiz.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const createQuestion = async (questionData) => {
  try {
    const question = new Question(questionData);
    return await question.save();
  } catch (error) {
    throw new Error(`Failed to create question: ${error.message}`);
  }
};

const getAllQuestions = async () => {
  try {
    return await Question.find().sort({ created_at: -1 });
  } catch (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
};

const getQuestionById = async (id) => {
  try {
    const question = await Question.findById(id);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error(`Failed to fetch question: ${error.message}`);
  }
};

const updateQuestion = async (id, questionData) => {
  try {
    const question = await Question.findByIdAndUpdate(id, questionData, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error(`Failed to update question: ${error.message}`);
  }
};

const deleteQuestion = async (id) => {
  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }
};

const generateQuestion = async ({ subject, type, difficulty }) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a ${type} question on the subject of ${subject} with ${difficulty} difficulty. Format the response exactly as: Question: [question here] Answer: [answer here]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse the response
    const questionMatch = text.match(/Question: (.*?)Answer:/s);
    const answerMatch = text.match(/Answer: (.*)/s);

    if (questionMatch && answerMatch) {
      return {
        subject,
        question: questionMatch[1].trim(),
        type,
        difficulty,
        answer: answerMatch[1].trim(),
      };
    } else {
      throw new Error("Failed to parse generated question");
    }
  } catch (error) {
    throw new Error(`Failed to generate question: ${error.message}`);
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
