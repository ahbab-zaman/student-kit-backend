const BudgetEntry = require("../models/budget.model");

const getAllEntries = async () => {
  return await BudgetEntry.find().sort({ date: -1 });
};

const getEntryById = async (id) => {
  return await BudgetEntry.findById(id);
};

const createEntry = async (data) => {
  const entry = new BudgetEntry(data);
  return await entry.save();
};

const updateEntry = async (id, data) => {
  return await BudgetEntry.findByIdAndUpdate(id, data, { new: true });
};

const deleteEntry = async (id) => {
  return await BudgetEntry.findByIdAndDelete(id);
};

module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
};
