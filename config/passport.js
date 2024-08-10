const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://taskmanagementbackend-aen8.onrender.com/auth/google/callback",
      // Ensure this matches your Google API Console configuration
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database by Google ID or email
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });

        if (user) {
          // If user exists, return the user
          return done(null, user);
        } else {
          // If user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            password: await bcrypt.hash(
              require("crypto").randomBytes(12).toString("hex"),
              10
            ),
          });

          await user.save();
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
