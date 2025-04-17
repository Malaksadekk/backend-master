// server/models/contact.js

const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 20,
  },
  subject: {
    type: String,
    required: true,
    maxlength: 255,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

function validateContact(contact) {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    phone: Joi.string().max(20).required(),
    subject: Joi.string().max(255).required(),
    message: Joi.string().max(1024).required(),
  });
  return schema.validate(contact);
}

module.exports = {
  Contact,
  validateContact,
};
