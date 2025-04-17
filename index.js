const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const path = require("path");

const hero = require("./routes/home/hero");
const appointments = require("./routes/home/appointment");
const workingHours = require("./routes/home/workingHours");
const generalSettings = require("./routes/generalSettings");
const departments = require("./routes/departments");
const blogPosts = require("./routes/blog/blogPosts");
const { BlogPost } = require("./models/blogs/blogPosts");
const doctors = require("./routes/doctors");
const { Doctor } = require("./models/doctors");
const services = require("./routes/services");
const { Service } = require("./models/services");
const contactRoute = require("./routes/contact");
const { Contact } = require("./models/contact");
const users = require("./routes/users");
const appointmentsRouter = require("./routes/home/appointment");
const { Appointment } = require("./models/home/appointment");
const auth = require("./routes/auth");
const authMiddleware = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
/*****************************************************/
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://asemyasser42:AySjWZpx9l8DZJ8t@hospitalsystem.aebye.mongodb.net/?retryWrites=true&w=majority&appName=HospitalSystem"
  )
  .then(() => {
    console.log("connecting to database");
  })
  .catch((err) => {
    console.error("could not connect to database", err);
  });

/*****************************************************/
//built-in middleware function:
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
/**************************************************************************************************/
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "./views");
/**************************************************************************************************/
app.use("/api/hero", hero);
app.use("/api/appointments", appointments);
app.use("/api/workingHours", workingHours);
app.use("/api/generalSettings", generalSettings);
app.use("/api/blogPosts", blogPosts);
app.use("/api/doctors", doctors);
app.use("/api/departments", departments);
app.use("/api/services", services);
app.use("/api/contact", contactRoute);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/login", auth);
app.use("/api/register", users);

/**************************************************************************************************/
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/**************************************************************************************************/

// Serve AdminLTE files
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "node_modules", "admin-lte"))
);

// Serve Font Awesome from node_modules
app.use(
  "/fontawesome",
  express.static(
    path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")
  )
);

// Login route
app.get("/login", (req, res) => {
  res.render("login");
});

//home route
app.get("/home",authMiddleware, (req, res) => {
  res.render("home");
});

// Serve the doctors page
app.get("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch doctors from the database
    res.render("doctors", { doctors });
  } catch (error) {
    res.status(500).send("Error fetching doctors data");
  }
});

// Serve the form to add a new doctor
app.get("/doctors/new", (req, res) => {
  res.render("add_doctor", { errors: [], doctor: {} });
});

// Route to view a specific doctor
app.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    res.render("doctor", { doctor });
  } catch (error) {
    res.status(500).send("Error fetching doctor data");
  }
});

// Route to serve the edit doctor form
app.get("/doctors/:id/edit", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    res.render("edit_doctor", { doctor });
  } catch (error) {
    res.status(500).send("Error fetching doctor data");
  }
});

// Serve the blogs page
app.get("/blogs", authMiddleware, async (req, res) => {
  try {
    // Add debug logging
    console.log("Fetching blogs...");

    const blogs = await BlogPost.find().sort("-date");
    console.log("Found blogs:", blogs);

    if (!blogs) {
      blogs = [];
    }

    res.render("blogs", { blogs });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Error fetching blog posts data");
  }
});

// Serve the form to add a new blog
app.get("/blogs/new", (req, res) => {
  res.render("add_blog", { errors: [], blog: {} });
});

// Route to view a specific blog
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog post not found");
    res.render("blog", { blog });
  } catch (error) {
    res.status(500).send("Error fetching blog post data");
  }
});

// Route to serve the edit blog form
app.get("/blogs/:id/edit", async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog post not found");
    res.render("edit_blog", { blog });
  } catch (error) {
    res.status(500).send("Error fetching blog post data");
  }
});

// Services routes
app.get("/services", authMiddleware, async (req, res) => {
  try {
    const services = await Service.find();
    res.render("services", { services });
  } catch (error) {
    res.status(500).send("Error fetching services data");
  }
});

app.get("/services/new", (req, res) => {
  res.render("add_service", { errors: [], service: {} });
});

app.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send("Service not found");
    res.render("service", { service });
  } catch (error) {
    res.status(500).send("Error fetching service data");
  }
});

app.get("/services/:id/edit", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send("Service not found");
    res.render("edit_service", { service });
  } catch (error) {
    res.status(500).send("Error fetching service data");
  }
});

// Serve the contacts page
app.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.render("contacts", { messages });
  } catch (error) {
    console.error("Error fetching contact messages:", error); // Log the error
    res.status(500).send("Error fetching contact messages");
  }
});

// Serve the appointments page
app.get("/appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort("datePicker");
    res.render("appointments", { appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log the error
    res.status(500).send("Error fetching appointments data");
  }
});

app.get("/appointments/:id/edit", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).send("Appointment not found");

    res.render("edit_appointment", { appointment, errors: [] });
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    res.status(500).send("Error fetching appointment data");
  }
});

// Handle the edit appointment form submission
app.post("/appointments/:id/edit", authMiddleware, async (req, res) => {
  try {
    const {
      Appointment,
      handleAppointmentValidation,
    } = require("./models/home/appointment");

    // Validate the request body
    const { error } = handleAppointmentValidation(req.body);
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      const appointment = await Appointment.findById(req.params.id);
      return res
        .status(400)
        .render("edit_appointment", { appointment, errors: errorMessages });
    }

    // Find and update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        department: req.body.department,
        phoneNumber: req.body.phoneNumber,
        datePicker: req.body.datePicker,
      },
      { new: true }
    );

    if (!updatedAppointment)
      return res.status(404).send("Appointment not found");

    res.redirect("/appointments");
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).send("Error updating appointment");
  }
});

// Logout Route
app.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.redirect("/login"); // Redirect to the login page after logout
});

// Environment Variables:
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`your server listening on port ${port}`);
});
