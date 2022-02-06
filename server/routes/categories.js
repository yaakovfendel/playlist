const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const Categories = require("../models/Categories");
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

router.post("/newcategory", authJWT, async (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  // let category = await Categories.findOne({
  //   id: req.body.id,
  //   createdBy: req.body.createdBy,
  // });
  // if (!category) {
  //   let newcategory = await new Categories(req.body).save();
  //   res.send(newcategory);
  // } else {
  //   res.send(false);
  // }
});

router.get("/", async (req, res) => {
  const categories = await Categories.find({});
  console.log({ categories });

  res.send(categories);
});

// router.delete("/", authJWT, async (req, res) => {
//   let song = await Song.findOne({
//     id: req.body,
//     createdBy: req.body.createdBy,
//   });
//   if (song) {
//     const deletedSong = await Song.deleteOne({
//       id: req.body,
//       createdBy: req.body.createdBy,
//     });
//     let songsList = await Song.find({});
//     console.log({ message: "OK", deletedSong });
//     res.send(songsList);
//   } else {
//     return res.status(401).send(false);
//   }
// });
module.exports = router;
