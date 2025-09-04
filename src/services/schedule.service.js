const Schedule = require("../models/schedule.model");
const scheduleService = {
  async createSchedule(data) {
    const schedule = new Schedule(data);
    return await schedule.save();
  },

  async getAllSchedules() {
    return await Schedule.find().sort({ day: 1, time_start: 1 });
  },

  async getScheduleById(id) {
    return await Schedule.findById(id);
  },

  async updateSchedule(id, data) {
    return await Schedule.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteSchedule(id) {
    return await Schedule.findByIdAndDelete(id);
  },

  async getSchedulesByDay(day) {
    return await Schedule.find({ day }).sort({ time_start: 1 });
  },
};

module.exports = scheduleService;
