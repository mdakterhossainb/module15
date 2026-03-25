const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  res.json({ message: "User registered successfully" });
};
//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "User login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
//get user profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};
//update user profile
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  await user.save();

  res.json({ message: "Profile updated successfully" });
};
