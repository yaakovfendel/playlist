//Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authJWT = require("./Controlers/authJWT");
const { connectDB } = require("./models/modelsIndex.js");
const {
  songsRoute,
  usersRoute,
  apiRoute,
  playlistsRoute,
  emploeyRoute,
} = require("./routes/router.js");

//Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use routes
app.use("/songs", songsRoute);
app.use("/users", usersRoute);
app.use("/playlists", authJWT, playlistsRoute);
app.use("/api", apiRoute);
app.use("/emploey", emploeyRoute);

//Connect the Database
connectDB().then(() => {
  console.log("Connected to DB successfully");
});

//Listen
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(PORT);
  console.log("%c Server running", "color: green");
});
