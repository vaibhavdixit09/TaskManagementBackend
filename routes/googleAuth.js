// routes/googleAuthRoutes.js
const express = require("express");
const passport = require("passport");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Initiate Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // Check if req.user is populated
    console.log("User Object:", req.user);

    if (!req.user) {
      return res.status(500).json({ error: "User data is not available" });
    }

    const payload = {
      _id: req.user._id,
      googleId: req.user.googleId,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      password: req.user.password,
    };
    console.log(payload, "payload");
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // res.json({ user: req.user, payload, token });
    res.redirect(
      `http://localhost:5173/dashboard/home?token=${token}&Is_socialLogin=true`
    );
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login"); // Redirect to the login page after logout
  });
});

module.exports = router;
