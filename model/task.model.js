const mongoose = require("mongoose");

// Define the schema for the Task
const taskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "On Hold"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  comment: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
  category: {
    type: String,
    enum: ["Office", "Personal"],
    default: "Personal",
  },
});

// Create and export the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
