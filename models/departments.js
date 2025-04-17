const Joi = require("joi");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 225,
  },
  desc: {
    type: String,
    required: true,
    minlength: 15,
  },
  img: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Department = mongoose.model("Department", departmentSchema);
/**************************************************************************************************/
function handleDepartmentValidatoin(hero) {
  const schema = Joi.object({
    header: Joi.string().min(3).required(),
    desc: Joi.string().min(15).required(),
  });
  return schema.validate(hero, { abortEarly: false });
}

exports.Department = Department;
exports.handleDepartmentValidatoin = handleDepartmentValidatoin;
