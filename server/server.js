//Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./models/modelsIndex.js");
const { songsRoute, usersRoute, apiRoute } = require("./routes/router.js");

//Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use routes
app.use("/songs", songsRoute);
app.use("/users", usersRoute);
app.use("/api", apiRoute);

//Connect the Database
connectDB().then(() => {
  console.log("Connected to DB successfully");
});

//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
