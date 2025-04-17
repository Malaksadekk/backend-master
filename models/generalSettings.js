const Joi = require("joi");
const mongoose = require("mongoose");

const generalSettingsSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  date: { type: Date, default: Date.now },
});

const GeneralSettings = mongoose.model(
  "GeneralSettings",
  generalSettingsSchema
);
/**************************************************************************************************/
function handleGeneralSettingsValidation(data) {
  const schema = Joi.object({
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .message("Invalid phone number format")
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } }) // Allows common email structure
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
    address: Joi.string()
      .min(5) // Minimum length for an address, adjust as needed
      .max(100) // Maximum length for an address
      .required()
      .messages({
        "string.empty": "Address is required",
        "string.min": "Address should have at least 5 characters",
        "string.max": "Address should have no more than 100 characters",
      }),
  });
  return schema.validate(data, { abortEarly: false });
}

exports.GeneralSettings = GeneralSettings;
exports.handleGeneralSettingsValidation = handleGeneralSettingsValidation;
