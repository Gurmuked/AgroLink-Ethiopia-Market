import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/Users.js"; 

const router = express.Router();

// LOGIN API - now accepts username and password
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('/login payload body:', req.body);

    // Check empty inputs
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required!" });
    }

    // Check user exists by username
    const user = await User.findOne({ username });
    console.log('/login lookup result user:', user ? user._id : null);
    if (!user) {
      // extra diagnostic: try finding by email or case-insensitive
      const byEmail = await User.findOne({ email: username });
      const ci = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
      console.log('/login diagnostics byEmail:', byEmail ? byEmail._id : null, 'ci:', ci ? ci._id : null);
    }
    if (!user) {
      return res.status(400).json({ message: "User not found! Please register." });
    }

    // Check password (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // Issue JWT on success
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        username: user.username,
        email: user.email,
        user_type: user.user_type,
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error!" });
  }
});

export default router;
