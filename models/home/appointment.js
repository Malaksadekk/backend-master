const Joi = require("joi");
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 50,
  },
  department: {
    type: String,
    required: [true, "Department selection is required"],
    enum: ["Dental", "U.C"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
  },
  datePicker: {
    type: Date,
    required: [true, "Date is required"],
  },
  date: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
/**************************************************************************************************/
function handleAppointmentValidation(appointment) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should have at least 3 characters",
      "string.max": "Name should not exceed 50 characters",
    }),
    department: Joi.string()
      .valid("Dental", "U.C") // Use actual department values
      .required()
      .messages({
        "any.only": "Invalid department selection",
        "any.required": "Department selection is required",
      }),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Invalid phone number format",
      }),
    datePicker: Joi.string().required().messages({
      "any.required": "Date is required",
    }),
  });

  return schema.validate(appointment);
}

exports.Appointment = Appointment;
exports.handleAppointmentValidation = handleAppointmentValidation;
