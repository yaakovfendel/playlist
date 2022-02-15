import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ shifts }) {
  const columns = [
    { field: "id", headerName: "Shifts", width: 70 },
    { field: "id_employee", headerName: "id_employee", width: 110 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    {
      field: "start",
      headerName: "Start",
      width: 120,
    },
    {
      field: "exit",
      headerName: "Exit",
      width: 120,
    },
    {
      field: "hours",
      headerName: "Hours",
      width: 120,
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 140,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  const id = shifts[0]?.id;
  const firstName = shifts[0]?.firstName;
  const lastName = shifts[0]?.lastName;
  const rows = shifts[0]?.shift.map((shift, index) => {
    return {
      id: index,
      id_employee: id,
      lastName: lastName,
      firstName: firstName,
      start: shift.start,
      exit: shift.exit,
      hours: shift.hours,
      salary: shift.salary,
    };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
