const { Doctor, handleDoctorValidation } = require('./../models/doctors');
const express = require('express');
const router = express.Router();
const upload = require('./image_uploader');

// get all doctors
router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.send(doctors);
});

// get doctor by id
router.get('/:id', async (req, res) => {
    const pid = req.params.id;
    const doctor = await Doctor.findById(pid);
    if(!doctor) {
        return res.status(404).send("The doctor is not available");
    }
    res.send(doctor);
});

// add doctor
router.post('/', upload.single('img'), async (req, res) => {

    const { error } = handleDoctorValidation(req.body);

    if(error){
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).send(errorMessages);
    }

    if(!req.file){
        return res.status(400).send("Doctor image is required");
    }

    let doctor = new Doctor({
        img: req.file.path,
        name: req.body.name,
        profession: req.body.profession
    });

    try{
        doctor = await doctor.save();
        res.status(201).send(doctor);
    } catch(error) {
        res.status(500).send("An error occured while saving the doctor");
    }
});

// update doctor
router.put('/:id', upload.single('img'), async(req, res) => {
    const { error } = handleDoctorValidation(req.body);

    if(error){
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).send(errorMessages);
    }

    const pid = req.params.id;
    let doctor = await Doctor.findById(pid);

    if(!doctor){
        return res.status(404).send("The doctor with given ID is not found");
    }

    const updatedData = {
        name: req.body.name,
        profession: req.body.profession
    };

    if(req.file){
        updatedData.img = req.file.path;
    }

    doctor = await Doctor.findByIdAndUpdate(pid, updatedData, { new: true});
    res.status(200).send(doctor);
});

// delete doctor
router.delete('/:id', async (req, res) => {
    const pid = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(pid);
    if(!doctor){
        return res.status(404).send("The doctor is not available");
    }
    res.status(200).send(doctor);
});

module.exports = router;