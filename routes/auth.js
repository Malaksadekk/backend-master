// server/routes/auth.js

const express = require("express");
const router = express.Router();
const { User } = require("../models/users"); // Adjust the path as needed
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config"); // Ensure you have a config setup

// User Login Route
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = handleAuthValidation(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  // Check if the user exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Credentials");

  // Validate the password
  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Credentials");

  // Generate JWT
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    config.get("jwtPrivateKey"),
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  // Set the token in an HTTP-only cookie
  res
    .cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Sends the cookie over HTTPS only in production
      sameSite: "strict", // Protects against CSRF
      maxAge: 3600000, // 1 hour in milliseconds
    })
    .redirect("/home"); // Redirect to the protected home route
});

// Validation Function
function handleAuthValidation(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(225).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user, { abortEarly: false });
}

module.exports = router;
