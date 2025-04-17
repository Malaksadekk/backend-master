const {
  Department,
  handleDepartmentValidatoin,
} = require("../models/departments");
const upload = require("../routes/image_uploader");
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
//get Departments
router.get("/", async (req, res) => {
  const department = await Department.find().sort("header");
  res.send(department);
});

/**************************************************************************************************/
//adding Department:
router.post("/", upload.single("img"), async (req, res) => {
  const { error } = handleDepartmentValidatoin(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  // check if the file was uploaded
  if (!req.file) {
    res.status(400).send("department cover is required..");
  }

  let department = new Department({
    header: req.body.header,
    desc: req.body.desc,
    img: req.file.path,
  });

  try {
    department = await department.save();
    res.status(201).send(department); // Send the created department object with status 201
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

/**************************************************************************************************/
//updating department:
router.put("/:id", upload.single("img"), async (req, res) => {
  // validate department
  const { error } = handleDepartmentValidatoin(req.body);
  if (error) {
    // Map through all error details and extract messages
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).send(errorMessages); // Send all error messages
  }

  let department = await Department.findById(req.params.id);
  if (!department)
    return res.status(404).send("the selected Department section is not found");

  const updatedData = {
    header: req.body.header,
    desc: req.body.desc,
  };
  if (req.file) {
    updatedData.img = req.file.path;
  }

  department = await Department.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  // Send the updated department as the response
  res.status(200).send(department);
});
/**************************************************************************************************/
router.delete("/:id", async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  // If the department data does not exist, return 404
  if (!department) {
    return res.status(404).send("department is not available");
  }
  // Return the deleted department data
  res.status(200).send(department);
});

module.exports = router;
