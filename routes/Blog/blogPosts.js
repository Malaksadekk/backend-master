const express = require("express");
const upload = require("../image_uploader.js");
const router = express.Router();
const { BlogPost } = require("../../models/blogs/blogPosts.js");
const validateBlogPost = require("../../models/blogs/blogPostValidation.js");

// Read All Blog Posts
router.get("/", async (req, res) => {
  try {
    console.log("API: Fetching blog posts");
    const posts = await BlogPost.find().sort("date");
    console.log("API: Found posts:", posts);
    res.send(posts);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).send("Server error");
  }
});

// Read Single Blog Post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .send("The blog post with the given ID was not found.");
    res.send(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Create New Blog Post
router.post("/", upload.single("imgSrc"), async (req, res) => {
  const { error } = validateBlogPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the file was uploaded
  if (!req.file) {
    res.status(400).send("logo is required..");
  }

  try {
    let post = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      imgSrc: req.file.path,
    });

    post = await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send("An error occurred");
  }
});

// Update Blog Post by ID
router.put("/:id", upload.single("imgSrc"), async (req, res) => {
  const { error } = validateBlogPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    updatedPost = { title: req.body.title, content: req.body.content };
    if (req.file) {
      updatedPost.imgSrc = req.file.path;
    }

    let post = await BlogPost.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
    });

    if (!post)
      return res
        .status(404)
        .send("The blog post with the given ID was not found.");
    res.send(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete Blog Post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post)
      return res
        .status(404)
        .send("The blog post with the given ID was not found.");
    res.send(post);
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
