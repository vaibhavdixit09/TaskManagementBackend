const express = require("express");
const {
  signup,
  login,
  getUserDetails,
  updateUser,
} = require("../controller/user.controller");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const {
  Create,
  Listing,
  DeleteTask,
  UpdateTask,
} = require("../controller/task.controller");
const { validateFields } = require("../validator/validateMiddleware");
const router = express.Router();

// user routes
router.post(
  "/signup",
  validateFields(["firstname", "lastname", "email", "password"]),
  signup
);
router.post("/login", validateFields(["email", "password"]), login);
router.get("/user-details", AuthenticateToken, getUserDetails);
router.put("/update-user/:id", updateUser);

// task routes
router.post("/create-task", validateFields(["title", "owner"]), Create);
router.get("/list-task/:id", Listing);
router.delete("/delete-task/:id", DeleteTask);
router.put("/update-task/:id", UpdateTask);

module.exports = router;
