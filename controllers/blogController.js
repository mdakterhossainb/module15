const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    user: req.user._id,
  });

  res.json({ message: "Blog created successfully", blog });
};
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("user", "name");
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog not found" });

  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  Object.assign(blog, req.body);
  await blog.save();

  res.json({ message: "Blog updated successfully" });
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await blog.deleteOne();

  res.json({ message: "Blog deleted successfully" });
};
