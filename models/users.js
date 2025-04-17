const Joi = require("joi");
const config = require("config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, name: this.name },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function handleUserValidation(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(11).max(11).required(),
    email: Joi.string().min(5).max(225).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user, { abortEarly: false });
}

exports.User = User;
exports.handleUserValidation = handleUserValidation;
