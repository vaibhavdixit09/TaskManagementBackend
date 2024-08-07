const Task = require("../model/task.model");

// Create a new task
const Create = async (req, res) => {
  try {
    const {
      owner,
      title,
      description,
      status,
      priority,
      comment,
      dueDate,
      category,
    } = req.body;

    // Validate input here if necessary
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!owner) {
      return res.status(400).json({ message: "Owner is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    if (!priority) {
      return res.status(400).json({ message: "Priority is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!dueDate) {
      return res.status(400).json({ message: "Due date is required" });
    }

    // Create a new task instance
    const task = new Task({
      owner,
      title,
      description,
      status,
      priority,
      comment,
      dueDate,
      category,
    });

    // Save the task to the database
    await task.save();

    // Respond with a success message and task details
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating task:", error);

    // Respond with a server error message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List all tasks
const Listing = async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve all tasks from the database and respond with them

    const allTasks = await Task.find({ owner: id });
    res
      .status(200)
      .json({ message: "All tasks fetched successfully", allTasks });
  } catch (err) {
    // Log the error and respond with an error message
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a task by ID
const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the task exists before attempting to delete
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    // Log the error and respond with an error message
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a task by ID
const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, comment, dueDate, category } =
      req.body;

    // Check if the task exists before attempting to update
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.comment = comment || task.comment;
    task.category = category || task.category;
    task.dueDate = dueDate || task.dueDate;

    // Save the updated task
    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    // Log the error and respond with an error message
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { Create, Listing, DeleteTask, UpdateTask };
