// middleware/auth.js
const jwt = require("jsonwebtoken");

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from header

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalid or expired
    req.user = user; // Attach user to request
    next(); // Continue to the route handler
  });
};

module.exports = AuthenticateToken;
