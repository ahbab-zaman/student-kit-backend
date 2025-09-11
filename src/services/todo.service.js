const Task = require("../models/todo.model");

const createTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    return await task.save();
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

const getAllTasks = async () => {
  try {
    return await Task.find().sort({ created_at: -1 });
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to fetch task: ${error.message}`);
  }
};

const updateTask = async (id, taskData) => {
  try {
    const task = await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
};

const deleteTask = async (id) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
