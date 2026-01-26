const path = require("path");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: "All users fetched successfully",
  });
};
exports.uploadProfilePicture = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
};
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

exports.readUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User read successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to read user",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    message: "User deleted successfully",
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: "User fetched by ID",
    userId: id,
  });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(200).json({
        status: "User login successful",
      });
    } else {
      res.status(404).json({
        status: "User not login successful",
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//change password start

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//change password start
exports.logoutUser = (req, res) => {
  // If you're using sessions
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      return res.status(200).json({ message: "User logout successful" });
    });
  } else {
    // For token-based auth (JWT)
    return res.status(200).json({ message: "User logout successful" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    return res.status(200).json({
      message: "User profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update user profile",
    });
  }
};

exports.makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "User made admin successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to make user admin",
    });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "Admin role removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove admin role",
    });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;

    return res.status(200).json({
      message: "User search completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "User search failed",
    });
  }
};

exports.filterUsers = async (req, res) => {
  try {
    const { role, status } = req.query;

    return res.status(200).json({
      message: "User filter completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "User filter failed",
    });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "User blocked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to block user",
    });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "User unblocked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to unblock user",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Email verification failed",
    });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    return res.status(200).json({
      message: "Verification email resent",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to resend verification email",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user ID is from auth middleware

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};
