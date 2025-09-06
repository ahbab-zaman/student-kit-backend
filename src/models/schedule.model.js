const mongoose = require("mongoose")
const scheduleSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    time_start: {
      type: String, // store as HH:mm
      required: true,
    },
    time_end: {
      type: String, // store as HH:mm
      required: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    color: {
      type: String,
      default: "blue-400",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", scheduleSchema);
