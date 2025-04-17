const {
  WorkingHours,
  handleWorkingHoursValidation,
} = require("../../models/home/workingHours");
const express = require("express");
const router = express.Router();

// GET all working hours
router.get("/", async (req, res) => {
  try {
    const workingHours = await WorkingHours.find().sort("day");
    res.send(workingHours);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving working hours");
  }
});

/**************************************************************************************************/

// ADD new working hours
router.post("/", async (req, res) => {
  const { error } = handleWorkingHoursValidation(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages);
  }

  let workingHours = new WorkingHours({
    days: req.body.days,
  });

  try {
    workingHours = await workingHours.save();
    res.status(201).send(workingHours);
  } catch (error) {
    res.status(500).send("An error occurred while saving working hours");
  }
});

/**************************************************************************************************/

// UPDATE working hours
router.put("/:id", async (req, res) => {
  const { error } = handleWorkingHoursValidation(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages);
  }

  let workingHours = await WorkingHours.findById(req.params.id);
  if (!workingHours)
    return res
      .status(404)
      .send("The selected working hours entry is not found");

  const updatedData = {
    days: req.body.days,
  };

  workingHours = await WorkingHours.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );
  // Send the updated workingHours as the response
  res.status(200).send(workingHours);
});

/**************************************************************************************************/

// DELETE working hours
router.delete("/:id", async (req, res) => {
  try {
    const workingHours = await WorkingHours.findByIdAndDelete(req.params.id);
    if (!workingHours) {
      return res.status(404).send("Working hours entry is not available");
    }
    res.status(200).send(workingHours);
  } catch (error) {
    res.status(500).send("An error occurred while deleting working hours");
  }
});

module.exports = router;
