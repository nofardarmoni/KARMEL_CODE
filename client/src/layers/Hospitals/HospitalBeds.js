import React from "react";
import { makeStyles } from "@material-ui/core";
import { hospitalBedsList } from "./hospitalDetails/bedsList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const columns = [
  {
    headerName: "מחלקה",
  },
  {
    headerName: "תקן",
  },
];

function createBedsTableRows(hospital) {
  const rows = Object.keys(hospitalBedsList).map((detail, id) => ({
    id,
    type: hospitalBedsList[detail].label,
    amount: hospital[detail],
  }));

  return rows;
}

const useStyles = makeStyles(() => ({
  scroll: {
    overflow: "auto",
    height: 246,
    direction: "rtl",
  },
  header: {
    fontWeight: "px",
    color: "white",
    textAlign: "right",
  },
  cell: {
    color: "white",
    textAlign: "right",
  },
  table: {
    minWidth: 200,
  },
}));

export default function HospitalBeds({ hospital }) {
  const classes = useStyles();

  return (
    <div className={classes.scroll}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, key) => (
              <TableCell className={classes.header} key={key}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {createBedsTableRows(hospital).map(
            (row) =>
              row.type &&
              row.amount !== null && (
                <TableRow key={row.id}>
                  <TableCell className={classes.cell}>{row.type}</TableCell>
                  <TableCell className={classes.cell}>{row.amount}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
