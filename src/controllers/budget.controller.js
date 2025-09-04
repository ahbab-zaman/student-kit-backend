const budgetService = require("../services/budget.service");

const getEntries = async (req, res) => {
  try {
    const entries = await budgetService.getAllEntries();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch entries", error });
  }
};

const addEntry = async (req, res) => {
  try {
    const entry = await budgetService.createEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: "Failed to add entry", error });
  }
};

const removeEntry = async (req, res) => {
  try {
    const entry = await budgetService.deleteEntry(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete entry", error });
  }
};

const updateEntry = async (req, res) => {
  try {
    const entry = await budgetService.updateEntry(req.params.id, req.body);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ message: "Failed to update entry", error });
  }
};

module.exports = {
  getEntries,
  addEntry,
  removeEntry,
  updateEntry,
};
