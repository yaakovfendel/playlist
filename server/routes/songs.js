const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
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

router.post("/", authJWT, async (req, res) => {
  // console.log(req.body);
  // console.log("id", req.body.id);
  // console.log("req.body.createdBy", req.body.createdBy);
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

router.get("/", async (req, res) => {
  let songsList = await Song.find({});
  res.send(songsList);
});

router.delete("/", authJWT, async (req, res) => {
  let song = await Song.findOne({
    id: req.body,
    createdBy: req.body.createdBy,
  });
  console.log("song", song);
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
