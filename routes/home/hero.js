const { Hero, handleHeroValidation } = require("../../models/home/hero");
const upload = require("../image_uploader");
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
//get hero
router.get("/", async (req, res) => {
  const hero = await Hero.find().sort("header");
  res.send(hero);
});

/**************************************************************************************************/
//adding hero:
router.post("/", upload.single("heroCover"), async (req, res) => {
  const { error } = handleHeroValidation(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  // check if the file was uploaded
  if (!req.file) {
    res.status(400).send("hero cover is required..");
  }

  let hero = new Hero({
    header: req.body.header,
    desc: req.body.desc,
    coloredDesc: req.body.coloredDesc,
    heroCover: req.file.path,
  });

  try {
    hero = await hero.save();
    res.status(201).send(hero); // Send the created hero object with status 201
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

/**************************************************************************************************/
//updating hero:
router.put("/:id", upload.single("heroCover"), async (req, res) => {
  // validate hero
  const { error } = handleHeroValidation(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  let hero = await Hero.findById(req.params.id);
  if (!hero)
    return res.status(404).send("the selected hero section is not found");

  const updatedData = {
    header: req.body.header,
    desc: req.body.desc,
    coloredDesc: req.body.coloredDesc,
  };
  if (req.file) {
    updatedData.heroCover = req.file.path;
  }

  hero = await Hero.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  // Send the updated hero as the response
  res.status(200).send(hero);
});
/**************************************************************************************************/
router.delete("/:id", async (req, res) => {
  const hero = await Hero.findByIdAndDelete(req.params.id);
  // If the hero data does not exist, return 404
  if (!hero) {
    return res.status(404).send("Hero is not available");
  }
  // Return the deleted hero data
  res.status(200).send(hero);
});

module.exports = router;
