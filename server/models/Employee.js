const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  shift: Object,
});

const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;
