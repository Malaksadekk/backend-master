const Joi = require("joi");
const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 225,
  },
  desc: {
    type: String,
    required: true,
    minlength: 15,
  },
  coloredDesc: {
    type: String,
  },
  heroCover: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Hero = mongoose.model("Hero", heroSchema);
/**************************************************************************************************/
function handleHeroValidation(hero) {
  const schema = Joi.object({
    header: Joi.string().min(5).required(),
    desc: Joi.string().min(15).required(),
    coloredDesc: Joi.string(),
  });
  return schema.validate(hero, { abortEarly: false });
}

exports.Hero = Hero;
exports.handleHeroValidation = handleHeroValidation;
