const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

function getHoursDiff(start, end) {
  return Math.abs(new Date(start) - new Date(end)) / 36e5;
}
const tempobj = {};
const SALARY = 100;
async function create(employediteles) {
  try {
    const employee = new Employee(employediteles);
    employee.save();
  } catch (e) {
    console.log(e);
  }
}
async function find_employe(id) {
  try {
    const employee = await Employee.findOne({
      id: id,
    });
    return employee;
  } catch (e) {
    console.log(e);
  }
}

async function findOneAndUpdate(
  find_the_employee,
  start,
  end_time,
  hours,
  salary,
  res
) {
  try {
    console.log({ start, end_time });
    const employee = await Employee.findOneAndUpdate(
      {
        _id: find_the_employee._id,
      },
      {
        shift: [
          ...find_the_employee.shift,
          {
            start: start,
            exit: end_time,
            hours: hours,
            salary: salary,
          },
        ],
      },
      {
        new: true,
      }
    );
    res.send([employee]);
  } catch (e) {
    console.log(e);
  }
}
async function findOneAndDelete(id) {
  try {
    const employee = await Employee.findOneAndDelete({ id: id });
    console.log("delete", employee);
  } catch (e) {
    console.log(e);
  }
}

router.post("/panchtime/:id/:action/:time", async (req, res) => {
  const time = Number(req.params.time);
  const action = req.params.action;
  const id = req.params.id;
  const first = req.body.firstName;
  const last = req.body.lastName;
  console.log({ last }, { first }, { id }, { action });
  action === "enter"
    ? enter_work(id, time, first, last)
    : exit_work(id, time, first, last);
  function enter_work(id, time, first, last) {
    console.log(tempobj);
    if (!tempobj[id]) {
      tempobj[id] = { start: time };
      console.log(tempobj);
    } else {
      return res.send(["eror-no "]);
    }
  }

  async function send_to_epmloyees(
    id,
    first,
    last,
    start,
    end_time,
    hours,
    salary,
    res
  ) {
    console.log({ id, first, last, start, end_time, hours, salary });
    let find_the_employee = await find_employe(id);
    console.log(Boolean(find_the_employee));
    console.log({ find_the_employee });
    if (!find_the_employee) {
      create({
        id: id,
        firstName: first,
        lastName: last,
        shift: [{ start: start, exit: end_time, hours: hours, salary: salary }],
      });
    } else {
      await findOneAndUpdate(
        find_the_employee,
        start,
        end_time,
        hours,
        salary,
        res
      );
    }
  }

  function exit_work(id, time, first, last) {
    if (tempobj[id]) {
      let hours = getHoursDiff(tempobj[id].start, time);
      let salary = hours * SALARY;
      send_to_epmloyees(
        id,
        first,
        last,
        tempobj[id].start,
        time,
        hours,
        salary,
        res
      );
      delete tempobj[id];
    } else {
      return res.send(["eror-no "]);
    }
  }
});
router.get("/panchtime/:id", async (req, res) => {
  const id = req.params.id;
  let find_the_employe = await find_employe(id);
  console.log(Boolean(find_the_employe));
  console.log(find_the_employe);
  console.log("find_the_employe");

  res.send([find_the_employe]);
});

router.get("/shiptstime/:id", async (req, res) => {
  const id = req.params.id;
  let find_the_employe = await find_employe(id);
  let hours = 0;
  let worker_salery = 0;

  if (find_the_employe) {
    find_the_employe.shift.forEach((shift) => {
      hours += shift.hours;
      worker_salery = hours * SALARY;
    });
    res.send([find_the_employe, hours, worker_salery]);
  } else {
    res.send(["eror-no "]);
  }
});
router.get("/shiptsmoney/:id", async (req, res) => {
  const id = req.params.id;
  let find_the_employe = await find_employe(id);
  if (find_the_employe) {
    const time_work_total = find_the_employe.shift
      .map((shift) => getHoursDiff(shift.start, shift.exit))
      .reduce((prev, curr) => prev + curr);
    const worker_salery = time_work_total * SALARY;
    res.send([find_the_employe, time_work_total, worker_salery]);
  } else {
    res.send(["eror-no "]);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await findOneAndDelete(id);
  console.log([id]);
  return res.send([id]);
});

module.exports = router;
