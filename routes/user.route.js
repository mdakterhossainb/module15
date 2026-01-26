const express = require("express");
const mongoose = require("mongoose");
const {
  createUser,
  readUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  uploadProfilePicture,
  changePassword,
  updateUser,
  logoutUser,
  updateProfile,
  makeAdmin,
  removeAdmin,
  searchUsers,
  filterUsers,
  blockUser,
  unblockUser,
  verifyEmail,
  resendVerification,
  deleteAccount,
} = require("../controllers/user.controller");
const router = express.Router();
router.get("/all-users", getAllUsers);
router.get("/user/:id", getUserById);
router.get("/read-user", readUser);
router.post("/login", loginUser);
router.post("/create-user", createUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
router.get("/upload-profile-picture", uploadProfilePicture);
router.put("/change-password", changePassword);
router.post("/logout", logoutUser);
router.put("/update-profile", updateProfile);
router.put("/make-admin/:id", makeAdmin);
router.put("/remove-admin/:id", removeAdmin);
router.get("/search", searchUsers);
router.get("/filter", filterUsers);
router.patch("/block-user/:id", blockUser);
router.patch("/unblock-user/:id", unblockUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.delete("/delete-account", deleteAccount);

module.exports = router;
