const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Sign up function
const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, address } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Respond with the token
    res.status(200).json({ email: email, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to get the authenticated user's details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user details from the database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Respond with user details
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, address, about } = req.body;

    const updatedData = {
      firstname,
      lastname,
      email,
      phone,
      address,
      about,
    };

    // Check if the user exists and update
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login, getUserDetails, updateUser };
