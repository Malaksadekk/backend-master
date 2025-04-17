const Joi = require("joi");
const mongoose = require("mongoose");

const workingHoursSchema = new mongoose.Schema({
  days: {
    saturday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    sunday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    monday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    tuesday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    wednesday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    thursday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
    friday: {
      type: String,
      required: [true, "Working hours selection is required"],
      enum: [
        "8:00 am-10:00 pm",
        "6:00 am-8:00 pm",
        "6:00 am-2:00 pm",
        "7:00 am-9:00 pm",
        "10:00 am-12:00 pm",
        "2:00 am-6:00 pm",
        "6:00 am-2:00 pm",
        "Closed",
      ],
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const WorkingHours = mongoose.model("WorkingHours", workingHoursSchema);
/**************************************************************************************************/
function handleWorkingHoursValidation(workingHours) {
  // const timePattern =
  //   /^(\d{1,2}:\d{2} (am|pm)-\d{1,2}:\d{2} (am|pm))$|^Closed$/;

  const schema = Joi.object({
    days: Joi.object({
      saturday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      sunday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      monday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      tuesday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      wednesday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      thursday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
      friday: Joi.string()
        .valid(
          "8:00 am-10:00 pm",
          "6:00 am-8:00 pm",
          "6:00 am-2:00 pm",
          "7:00 am-9:00 pm",
          "10:00 am-12:00 pm",
          "2:00 am-6:00 pm",
          "6:00 am-2:00 pm",
          "Closed"
        )
        .required()
        .messages({
          "any.only": "Invalid working hours selection",
          "any.required": "Working hours selection is required",
        }),
    }).required(),
  });

  return schema.validate(workingHours);
}

exports.WorkingHours = WorkingHours;
exports.handleWorkingHoursValidation = handleWorkingHoursValidation;
