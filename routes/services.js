const { Service, handleServiceValidation } = require('./../models/services');
const express = require('express');
const router = express.Router();
const upload = require('./image_uploader');

// get all services
router.get('/', async (req, res) => {
    const services = await Service.find();
    res.send(services);
});

// get service by id
router.get('/:id', async (req, res) => {
    const pid = req.params.id;
    const service = await Service.findById(pid);
    if(!service) {
        return res.status(404).send("The service is not available");
    }
    res.send(service);
});

// add service
router.post('/', upload.single('img'), async (req, res) => {

    const { error } = handleServiceValidation(req.body);

    if(error){
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).send(errorMessages);
    }

    if(!req.file){
        return res.status(400).send("Service image is required");
    }

    let service = new Service({
        img: req.file.path,
        service: req.body.service,
        description: req.body.description
    });

    try{
        service = await service.save();
        res.status(201).send(service);
    } catch(error) {
        res.status(500).send("An error occured while saving the service");
    }
});

// update service
router.put('/:id', upload.single('img'), async(req, res) => {
    const { error } = handleServiceValidation(req.body);

    if(error){
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).send(errorMessages);
    }

    const pid = req.params.id;
    let service = await Service.findById(pid);

    if(!service){
        return res.status(404).send("The service with given ID is not found");
    }

    const updatedData = {
        service: req.body.service,
        description: req.body.description
    };

    if(req.file){
        updatedData.img = req.file.path;
    }

    service = await Service.findByIdAndUpdate(pid, updatedData, { new: true});
    res.status(200).send(service);
});

// delete service
router.delete('/:id', async (req, res) => {
    const pid = req.params.id;
    const service = await Service.findByIdAndDelete(pid);
    if(!service){
        return res.status(404).send("The service is not available");
    }
    res.status(200).send(service);
});

module.exports = router;