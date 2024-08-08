const express = require("express");
const Dbconnect = require("./utils/Dbconnect");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();
require("dotenv").config();

// Use cors middleware
app.use(
  cors({
    origin: [
      "https://jazzy-kleicha-8be487.netlify.app",
      "http://localhost:5173",
    ], // Allow this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);
// Handle preflight requests
app.options("*", cors());

require("./utils/scheduler");

app.use(express.json());

app.use("/api/v1", routes);

// connecting db
Dbconnect();

// app listening
app.listen(process.env.PORT, (req, res) => {
  console.log("app running");
});
