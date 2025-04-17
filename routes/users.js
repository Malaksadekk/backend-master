const { User, handleUserValidation } = require("../models/users");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

// Add Admin route
router.post("/addAdmin", async (req, res) => {
  const { error } = handleUserValidation(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    // return res.status(400).send(errorMessages);
    return res.status(400).send(errorMessages);
  }

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  // if (user) return res.status(400).send("The user already exists");
  if (user) return res.status(400).send("The user already exists");

  // Create new admin user
  const salt = await bcrypt.genSalt(10);
  user = new User(_.pick(req.body, ["name", "phone", "email", "password"]));
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  // Send the token in the response header and return the admin details
  // res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'phone', 'email']));
  res.header("x-auth-token", token).redirect("/");
});

module.exports = router;
