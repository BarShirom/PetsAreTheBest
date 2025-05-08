import { RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const getAllUsers: RequestHandler = async (_, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};
