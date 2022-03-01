const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const username = req.body[0];
  const password = req.body[1];
  console.log(username, password);

  try {
    const userAlreadyExicst = await User.findOne({ username: username });
    if (userAlreadyExicst)
      return res
        .status(401)
        .send(`alredy Exisct`, console.log("alredy Exisct"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      password_user: password,
    });

    const savedUser = await user.save();
    console.log("New user saved successfully");
    // res.json(savedUser);
    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );
    res.json({ accessToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body[0];
  const password = req.body[1];
  console.log(username, password, "login");
  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        JSON.stringify(user),
        process.env.TOKEN_SECRET
        // { expiresIn: "20s" }
      );
      // const accessToken = jwt.sign(
      //   JSON.stringify(user),
      //   process.env.TOKEN_SECRET,
      //   { expiresIn: "20m" }
      // );

      res.json({ accessToken });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  let users = await User.find({});
  console.log(users);
  res.send(users);
});
module.exports = router;
