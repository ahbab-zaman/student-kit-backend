const scheduleService = require("../services/schedule.service.js");

const scheduleController = {
  async create(req, res) {
    try {
      const schedule = await scheduleService.createSchedule(req.body);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const schedules = await scheduleService.getAllSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const schedule = await scheduleService.getScheduleById(req.params.id);
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await scheduleService.updateSchedule(
        req.params.id,
        req.body
      );
      if (!updated) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await scheduleService.deleteSchedule(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.json({ message: "Schedule deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getByDay(req, res) {
    try {
      const { day } = req.params;
      const schedules = await scheduleService.getSchedulesByDay(day);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = scheduleController;
