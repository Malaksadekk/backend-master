const {
  GeneralSettings,
  handleGeneralSettingsValidation,
} = require("../models/generalSettings");
const upload = require("../routes/image_uploader");
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
//get all generalSettings
router.get("/", async (req, res) => {
  const generalSettings = await GeneralSettings.find().sort("name");
  res.send(generalSettings);
});
/**************************************************************************************************/
//adding generalSettings:
router.post("/", upload.single("logo"), async (req, res) => {
  const { error } = handleGeneralSettingsValidation(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  // check if the file was uploaded
  if (!req.file) {
    res.status(400).send("logo is required..");
  }

  let generalSettings = new GeneralSettings({
    logo: req.file.path,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
  });

  try {
    generalSettings = await generalSettings.save();
    res.status(201).send(generalSettings); // Send the created generalSettings object with status 201
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

/**************************************************************************************************/
//updating generalSettings:
router.put("/:id", upload.single("logo"), async (req, res) => {
  // validate the generalSettings
  const { error } = handleGeneralSettingsValidation(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  let generalSettings = await GeneralSettings.findById(req.params.id);
  if (!generalSettings)
    return res
      .status(404)
      .send("the generalSettings object with the given id is not found");

  const updatedData = {
    phoneNumber: req.body.PhoneNumber,
    email: req.body.email,
    address: req.body.address,
  };
  if (req.file) {
    updatedData.logo = req.file.path;
  }

  generalSettings = await GeneralSettings.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );
  // Send the updated generalSettings object as the response
  res.status(200).send(generalSettings);
});
/**************************************************************************************************/
router.delete("/:id", async (req, res) => {
  const generalSettings = await GeneralSettings.findByIdAndDelete(
    req.params.id
  );
  // If the generalSettings does not exist, return 404
  if (!generalSettings) {
    return res.status(404).send("The generalSettings object is not available");
  }
  // Return the deleted generalSettings object
  res.status(200).send(generalSettings);
});

module.exports = router;
