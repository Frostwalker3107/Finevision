import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";

const HomePatientsTable = ({ patients = [] }) => {
  const lastVisitColumns = [
    {
      accessorKey: "patientName",
      header: "Name",
      minSize: 40,
    },
    {
      accessorKey: "lastVisitDate",
      header: "Last Visit Date",
      minSize: 40,
    },
  ];

  const nextVisitColumns = [
    {
      accessorKey: "patientName",
      header: "Name",
      minSize: 40,
    },
    {
      accessorKey: "nextVisitDate",
      header: "Next Visit Date",
      minSize: 40,
    },
  ];

  const tableOptions = {
    data: patients,
    enablePagination: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid #D3D3D3",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid #D3D3D3",
        backgroundColor: "#222151",
        color: "#EEE",
      },
    },
  };

  const lastVisitTable = useMaterialReactTable({
    ...tableOptions,
    columns: lastVisitColumns,
  });

  const nextVisitTable = useMaterialReactTable({
    ...tableOptions,
    columns: nextVisitColumns,
  });

  return (
    <Box
      sx={{
        width: "100%",
        gap: 2,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}
    >
      <MaterialReactTable table={lastVisitTable} />
      <MaterialReactTable table={nextVisitTable} />
    </Box>
  );
};

export default HomePatientsTable;
