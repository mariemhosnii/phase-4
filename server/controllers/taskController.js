const Task = require("../models/Task");

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task id" });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      status: req.body.status,
      priority: req.body.priority,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const updates = {};
    ["title", "description", "deadline", "status", "priority"].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid task id" });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
