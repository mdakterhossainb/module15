const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    authorName: String,
    tags: [String],
    blogImage: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
