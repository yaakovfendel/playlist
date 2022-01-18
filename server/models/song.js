const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  id: { type: String, required: true },
  duration: { type: String, required: true },
  thumbnails: { type: String, required: true },
  title: { type: String, required: true },
  views: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: String, required: false },
  uploadedAt: { type: String },
  playlist: { type: Array, require: false },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    // required: true,
  },
  provider: { type: String },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
