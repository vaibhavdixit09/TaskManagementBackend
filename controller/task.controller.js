// controllers/task.controller.js
const taskService = require("../services/task.service");

// Create a new task
const Create = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: error.message });
  }
};

// List all tasks
const Listing = async (req, res) => {
  try {
    const { id } = req.params;
    const allTasks = await taskService.listTasks(id);
    res
      .status(200)
      .json({ message: "All tasks fetched successfully", allTasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a task by ID
const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a task by ID
const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(id, req.body);
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { Create, Listing, DeleteTask, UpdateTask };
