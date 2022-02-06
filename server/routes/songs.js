const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log("user", user._id);
      req.body.createdBy = user._id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post("/newsong", authJWT, async (req, res) => {
  let song = await Song.findOne({
    id: req.body.id,
    createdBy: req.body.createdBy,
  });
  if (!song) {
    let newSong = await new Song({ ...req.body }).save();
    res.send(newSong);
  } else {
    res.send(false);
  }
});

router.post("/", async (req, res) => {
  console.log("body", req.body);
  let userid = await User.findOne({ username: req.body.username });
  if (userid) {
    const usersongsList = await Song.find({ createdBy: userid._id });
    const songsList = await Song.find({});
    res.send([usersongsList, songsList]);
  }
});

router.delete("/", authJWT, async (req, res) => {
  let song = await Song.findOne({
    id: req.body,
    createdBy: req.body.createdBy,
  });
  if (song) {
    const deletedSong = await Song.deleteOne({
      id: req.body,
      createdBy: req.body.createdBy,
    });
    let songsList = await Song.find({});
    console.log({ message: "OK", deletedSong });
    res.send(songsList);
  } else {
    return res.status(401).send(false);
  }
});
module.exports = router;
