import express from "express";
import User from "../models/Users.js"; // Make sure path is correct
import protect from "../middleware/auth.js";

const router = express.Router();

// GET all users
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from DB
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
});

// GET current user profile
router.get("/me", protect, async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
