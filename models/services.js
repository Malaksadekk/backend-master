const Joi = require('joi');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    }
});

const Service = mongoose.model("Service", serviceSchema);

function handleServiceValidation(service){
    const schema = Joi.object({
        service: Joi.string().min(3).max(200).required(),
        description: Joi.string().min(10).required()
    });
    return schema.validate(service, { abortEarly: false });
}

exports.Service = Service;
exports.handleServiceValidation = handleServiceValidation;