const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

module.exports = app;
