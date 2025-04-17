// server/routes/contact.js

const express = require("express");
const router = express.Router();
const { Contact, validateContact } = require("../models/contact");
const auth = require("../middlewares/auth");

// POST /api/contact
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validateContact(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new contact message
  const contact = new Contact({
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    date: new Date(),
  });

  try {
    await contact.save();
    res.send({ message: "Message received" });
  } catch (err) {
    res.status(500).send("An error occurred while saving the message.");
  }
});

// GET /api/contact/messages
router.get("/messages", auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 }); // Fetch messages sorted by date
    res.send(messages);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving messages.");
  }
});

module.exports = router;
