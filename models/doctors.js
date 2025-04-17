const Joi = require('joi');
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    profession: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

function handleDoctorValidation(doctor){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        profession: Joi.string().min(3).max(100).required()
    });
    return schema.validate(doctor, { abortEarly: false });
}

exports.Doctor = Doctor;
exports.handleDoctorValidation = handleDoctorValidation;