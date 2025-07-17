//WHAT I AM DOING:
// routes/auth.js
//this file handles user registration and login

import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; //connect to our Use model

const router = express.Router();

//REGISTER - Create a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if that email is already used
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //If not, save the new user (password gets hashed)
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

//LOGIN - user logs in, gets a token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //Compare input password with hashed password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  //Create a signed token ( I will use this to protect routes)
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "SECRET_KEY", //replace later with an .env variable
    { expiresIn: "1hr" }
  );

  res.json({
    token, //front end will store this
    role: user.role,
    name: user.name,
    message: "Login successful",
  });
});

export default router;
