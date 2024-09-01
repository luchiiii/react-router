const Blog = require("../models/blogModel");
const getPagination = require("../helpers/paginationHelpers");

//create new blog
const createBlog = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;
    const blog = new Blog({ title, content, user: userId });

    await blog.save();

    if (!blog) {
      return res.status(400).json({ error: "Blog creation failed" });
    }

    return res.status(201).json({ message: " Blog created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//get all blogs
const getBlogs = async (req, res) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "email _id");
    return res.status(200).json({ message: "Blogs found", blogs });
  } catch (error) {
    return res.status(500).json({ error: " Something went wrong" });
  }
};

//get single blog
const getSingleBlog = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createBlog, getBlogs, getSingleBlog };
