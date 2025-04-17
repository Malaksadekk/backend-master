// models/blogs/blogPosts.js
const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = { BlogPost }; // Export as object
