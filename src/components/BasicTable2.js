import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Sidebaremployes.css";
export default function BasicTable2({ totalTime }) {
  const firstName = totalTime[0]?.firstName;
  const lastName = totalTime[0]?.lastName;
  const id = totalTime[0]?.id;

  const totalTimeWork = totalTime[1].toFixed(4);
  console.log(totalTimeWork);
  const totalSalary = totalTime[2].toFixed(4);
  console.log(totalSalary);
  function createData(id, firstName, lastName, totalTimeWork, totalSalary) {
    return { id, firstName, lastName, totalTimeWork, totalSalary };
  }
  const rows = [
    createData(id, firstName, lastName, totalTimeWork, totalSalary),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID EMPLOYEE</TableCell>
            <TableCell align="right">FIRST NAME</TableCell>
            <TableCell align="right">LAST NAME</TableCell>
            <TableCell align="right">TOTAL WORK TIME</TableCell>
            <TableCell align="right">TOTAL SALARY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.totalTimeWork}</TableCell>
              <TableCell align="right">{row.totalSalary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
