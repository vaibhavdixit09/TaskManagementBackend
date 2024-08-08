// services/task.service.js
const Task = require("../model/task.model");

const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

const listTasks = async (ownerId) => {
  return await Task.find({ owner: ownerId });
};

const deleteTask = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  await Task.findByIdAndDelete(taskId);
};

const updateTask = async (taskId, updateData) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  Object.assign(task, updateData);
  await task.save();
  return task;
};

module.exports = {
  createTask,
  listTasks,
  deleteTask,
  updateTask,
};
