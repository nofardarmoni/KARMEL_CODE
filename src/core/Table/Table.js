import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Input,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(() => ({
  table: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: "20px 10px",
  },
  selectTableCell: {
    padding: "0 0 0 15px",
  },
  columnTitle: {
    fontFamily: "AlmoniBold",
    fontSize: 18,
    textAlign: "center",
    padding: "0 10px",
  },
  tableCell: {
    fontSize: 16,
    textAlign: "center",
    padding: "0 40px",
  },
  emptyCell: {
    padding: "0 0 0 25px",
  },
  tableBody: {
    overflow: "auto",
  },
  input: {
    width: 50,
  },
}));

export default function GenericTable({
  rows,
  columns,
  isDisplayed,
  displayData,
  setRows,
  saveRows,
}) {
  const classes = useStyles();
  const [editedRowsList, setEditedRowsList] = useState([]);
  const [disabledRowsList, setDisabledRowsList] = useState([]);
  const rowsRef = useRef(rows);
  const handleEdit = (rowIndex) => {
    const editedRowsListCopy = [...editedRowsList];
    const disabledRowsListCopy = [...disabledRowsList];

    editedRowsListCopy.push(rowIndex);
    disabledRowsListCopy.push(rowIndex);
    setDisabledRowsList(disabledRowsListCopy);
    setEditedRowsList(editedRowsListCopy);
  };

  const handleSave = (rowIndex) => {
    const editedRowsListCopy = [...editedRowsList];
    const editedRowIndex = editedRowsList.indexOf(rowIndex);

    rowsRef.current[rowIndex] = rows[rowIndex];

    editedRowsListCopy.splice(editedRowIndex, 1);
    saveRows(rows[rowIndex]);
    setEditedRowsList(editedRowsListCopy);
  };

  const handleCancel = (rowIndex) => {
    const editedRowsListCopy = [...editedRowsList];
    const disabledRowsListCopy = [...disabledRowsList];
    const editedRowIndex = editedRowsList.indexOf(rowIndex);
    const disabledRowIndex = disabledRowsList.indexOf(rowIndex);
    const isRowDisabled = disabledRowIndex !== -1;
    const rowsCopy = rows.map((row) => {
      return { ...row };
    });

    rowsCopy[rowIndex] = rowsRef.current[rowIndex];

    editedRowsListCopy.splice(editedRowIndex, 1);

    if (isRowDisabled) {
      disabledRowsListCopy.splice(disabledRowIndex, 1);
    }

    setRows(rowsCopy);
    setDisabledRowsList(disabledRowsListCopy);
    setEditedRowsList(editedRowsListCopy);
  };

  const handleChange = (event, rowIndex) => {
    const [column, value] = [event.target.name, Number(event.target.value)];
    const disabledRowsListCopy = [...disabledRowsList];
    const disabledRowIndex = disabledRowsList.indexOf(rowIndex);
    const isRowDisabled = disabledRowIndex !== -1;
    const rowsCopy = rows.map((row) => {
      return { ...row };
    });

    rowsCopy[rowIndex][column] = value;

    if (value === rowsRef.current[rowIndex][column]) {
      disabledRowsListCopy.push(rowIndex);
    } else {
      if (isRowDisabled) {
        disabledRowsListCopy.splice(disabledRowIndex, 1);
      }
    }

    setRows(rowsCopy);
    setDisabledRowsList(disabledRowsListCopy);
  };

  useEffect(() => {
    if (!rowsRef.current.length && rows.length) {
      rowsRef.current = rows.map((row) => {
        return { ...row };
      });
    }
  }, [rows]);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.emptyCell} />
          {Object.keys(columns).map((column) => (
            <TableCell className={classes.columnTitle} key={column}>
              {columns[column].label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className={classes.tableBody}>
        {rows.map(
          (row, index) =>
            isDisplayed(row) && (
              <TableRow key={row.Id}>
                <TableCell className={classes.selectTableCell}>
                  {editedRowsList.includes(index) ? (
                    <>
                      <div>
                        <IconButton
                          disabled={disabledRowsList.includes(index)}
                          onClick={() => handleSave(index)}
                        >
                          <DoneIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton onClick={() => handleCancel(index)}>
                          <CancelIcon />
                        </IconButton>
                      </div>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                {Object.keys(columns).map((column) => (
                  <TableCell className={classes.tableCell} key={column}>
                    {editedRowsList.includes(index) &&
                    columns[column].isEditable ? (
                      <Input
                        className={classes.input}
                        value={row[column]}
                        onChange={(event) => handleChange(event, index)}
                        inputProps={{
                          min: 0,
                          type: "number",
                          name: column,
                        }}
                      />
                    ) : (
                      displayData(row[column], column)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}
