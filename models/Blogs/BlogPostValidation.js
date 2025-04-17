const Joi = require("joi");

const validateBlogPost = (blogPost) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
    date: Joi.date(),
  });

  return schema.validate(blogPost);
};

module.exports = validateBlogPost;
