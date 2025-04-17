// server/middleware/auth.js

const jwt = require("jsonwebtoken");
const config = require("config"); // Ensure you have a config setup

module.exports = function (req, res, next) {
  // Get token from cookies
  const token = req.cookies.token;

  console.log("Auth Middleware: Checking token...");

  // Check if no token
  if (!token) {
    console.log("Auth Middleware: No token found");
    return res.redirect("/login"); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; // Attach user info to the request object
    console.log("Auth Middleware: Token verified");
    next();
  } catch (err) {
    console.log("Auth Middleware: Invalid token");
    res.clearCookie("token"); // Clear the invalid token
    return res.redirect("/login"); // Redirect to login
  }
};
