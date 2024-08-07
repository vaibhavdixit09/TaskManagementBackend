const express = require("express");
const Dbconnect = require("./utils/Dbconnect");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();
require("dotenv").config();

// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);

app.use(express.json());

app.use("/api/v1", routes);

// connecting db
Dbconnect();

// app listening
app.listen(process.env.PORT, (req, res) => {
  console.log("app running");
});
