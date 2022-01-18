const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  console.log(req.body[0], req.body[1]);
  try {
    const hashedPassword = await bcrypt.hash(req.body[1], 10);
    const user = new User({
      username: req.body[0],
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log("New user saved successfully");
    res.json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        JSON.stringify(user),
        process.env.TOKEN_SECRET
      );
      res.json({ accessToken });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});
module.exports = router;
