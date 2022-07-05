import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";

const useStyles = makeStyles(() => ({
  openButton: {
    zIndex: 1000,
    position: "absolute",
    left: 110,
    top: ({ top }) => top,
    width: 60,
    height: 60,
    color: "white",
    boxShadow: "0 0 10px #000040",
    background: "#000040",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "0.3s",
      backgroundColor: "#000060",
      boxShadow: "0 0 10px #000040",
    },
  },
}));

export default function BIButton({ onClick, top }) {
  const classes = useStyles({ top });

  return (
    <IconButton className={classes.openButton} onClick={onClick}>
      <ShowChartIcon />
    </IconButton>
  );
}
