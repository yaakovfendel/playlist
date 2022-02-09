const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const jwt = require("jsonwebtoken");

router.get("/playlist/:playlist", async (req, res) => {
  try {
    const platlistName = req.params.playlist;
    const user = req.body.createdBy;
    const playlist = await Playlist.findOne({
      PlaylistName: platlistName,
      user: user,
    }).populate("songs");
    res.send(playlist.songs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ massege: "internal server error" });
  }
});

router.get("/userPlaylists", async (req, res) => {
  console.log(req.body);
  try {
    const user = req.body.createdBy;
    const allPlaylists = await Playlist.find({
      user: user,
    }).populate("songs");
    res.send(allPlaylists);
  } catch (e) {
    console.log(e);
    res.status(500).json({ massege: "internal server error" });
  }
});

//add song to play list user

router.put("/", async (req, res) => {
  try {
    const platlistName = req.body.playlistName;
    const song = req.body.song;
    const user = req.body.createdBy;
    let songId = await Song.findOne({ id: song.id }).select("_id");
    let Playlists = [];
    if (!songId) {
      const newSong = await new Song({ ...song }).save();
      songId = newSong._id;
      const updatePlaylist = await Playlist.updateMany(
        {
          PlaylistName: platlistName,
          user: user,
        },
        { $push: { songs: songId } }
      );
      Playlists = await Playlist.find({
        PlaylistName: platlistName,
        user: user,
      }).populate("songs");
    } else {
      platlistName.map(async (platlistName) => {
        const songinplaylist = await Playlist.findOne({
          PlaylistName: platlistName,
          user: user,
          songs: songId,
        });
        if (!songinplaylist) {
          const updatePlaylist = await Playlist.updateMany(
            {
              PlaylistName: platlistName,
              user: user,
            },
            { $push: { songs: songId } },
            {
              new: true,
            }
          );
          Playlists = await Playlist.find({
            PlaylistName: platlistName,
            user: user,
          }).populate("songs");
          console.log({ Playlists });
        } else {
          // return res.send({ massege: "allredy exiset" });
        }
      });
    }
    res.send(Playlists);
  } catch (e) {
    console.log(e);
    res.status(500).json({ massege: "internal server error" });
  }
});
//create new play list
router.post("/", async (req, res) => {
  const PlaylistName = req.body.playlistName;
  const user = req.body.createdBy;
  const playlist = await Playlist.findOne({
    PlaylistName: PlaylistName,
    user: user,
  });
  if (!playlist) {
    const newplaylist = await new Playlist({
      PlaylistName: PlaylistName,
      user: user,
    }).save();
    console.log("newplaylist", newplaylist);
    const allPlaylists = await Playlist.find({
      user: user,
    });
    res.send(allPlaylists);
  } else {
    console.log("allredy exsist");
    res.send({ message: "allredy exsist" });
  }
});

router.put("/delete", async (req, res) => {
  try {
    const PlaylistName = req.body.playlistName;
    console.log(PlaylistName);
    const song_id = req.body.song_id;
    const user = req.body.createdBy;
    const song_in_playlist = await Playlist.findOneAndUpdate(
      {
        PlaylistName: PlaylistName,
        songs: song_id,
        user: user,
      },
      {
        $pull: { songs: song_id },
      }
    );
    const Playlists = await Playlist.find({
      PlaylistName: PlaylistName,
      user: user,
    }).populate("songs");
    console.log(Playlists);
    res.send(Playlists);
  } catch (e) {
    console.log(e);
    res.status(500).json({ massege: "internal server error" });
  }
});

module.exports = router;
