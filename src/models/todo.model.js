const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  due_date: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["todo", "in_progress", "completed"],
    default: "todo",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

taskSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
