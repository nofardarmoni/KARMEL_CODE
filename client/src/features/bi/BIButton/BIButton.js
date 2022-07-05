import React from "react";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";

const useStyles = makeStyles(() => ({
  openButton: {
    zIndex: 1000,
    position: "absolute",
    left: ({ left }) => left ?? 110,
    top: ({ top }) => top,
    right: ({ right }) => right,
    bottom: ({ bottom }) => bottom,
    width: 60,
    height: 60,
    color: "white",
    boxShadow: "0 0 10px #191919",
    background: "#191919",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "0.3s",
      backgroundColor: "#191919",
      boxShadow: "0 0 10px #191919",
    },
  },
}));

export default function BIButton({ onClick, top, icon, title, left, right,bottom }) {
  const classes = useStyles({ top, left,right,bottom });

  return (
    <Tooltip arrow={true} title={title}>
      <IconButton className={classes.openButton} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
