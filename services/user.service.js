// services/user.service.js
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signup = async (userData) => {
  const { firstname, lastname, email, password, phone, address } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    phone,
    address,
  });

  await newUser.save();
  return { message: "User created successfully" };
};

const login = async (loginData) => {
  const { email, password } = loginData;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { email, token };
};

const getUserDetails = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const { firstname, lastname, email, phone, address, about } = updateData;

  const updatedData = {
    firstname,
    lastname,
    email,
    phone,
    address,
    about,
  };

  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  signup,
  login,
  getUserDetails,
  updateUser,
};
