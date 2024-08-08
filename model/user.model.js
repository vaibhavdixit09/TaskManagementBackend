const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  phone: { type: String },
  about: { type: String },
  address: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

// Create and export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
