const mongoose = require("mongoose");
const { Song } = require("./Song.js");
const { User } = require("./User.js");
const { Employee } = require("./Employee.js");
const { Shifts } = require("./Shifts");

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  return await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const models = { Song, User, Employee, Shifts };
module.exports = { connectDB, models };
