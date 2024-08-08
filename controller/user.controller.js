// controllers/user.controller.js
const userService = require("../services/user.service");

// Sign up function
const signup = async (req, res) => {
  try {
    const response = await userService.signup(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get the authenticated user's details
const getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserDetails(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user function
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { signup, login, getUserDetails, updateUser };
