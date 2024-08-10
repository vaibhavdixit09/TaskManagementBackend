const express = require("express");
const Dbconnect = require("./utils/Dbconnect");
const cors = require("cors");
const routes = require("./routes/routes");
const googleRoutes = require("./routes/googleAuth");
const session = require("express-session");
const passport = require("passport");

const app = express();
require("dotenv").config();

app.use(express.json());
// Use cors middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
require("./config/passport");
require("./utils/scheduler");

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", routes);
app.use(googleRoutes);

// connecting db
Dbconnect();

// app listening
app.listen(process.env.PORT, (req, res) => {
  console.log("app running");
});
