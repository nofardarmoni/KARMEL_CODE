import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  graphFrame: {
    zIndex: 1000,
    direction: "ltr",
    textAlign: "center",
    backgroundColor: "rgb(25 25 25)",
    borderRadius: "10px",
    height: "100%",
    width: "100%",
  },
  graphContainer: {
    height: "85%",
    width: "100%",
  },
  graphTitle: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "AlmoniBold",
    fontSize: "15px",
    padding: "10px",
  },
  graphLine: {
    width: "100%",
    height: "1px",
    position: "relative",
    backgroundColor: "#00ced1",
    marginBottom: "1%",
  },
  graphBar: {
    height: "85%",
  },
}));

export default function GraphFrame({
  hideGraph,
  title,
  children,
  alternativeDesc,
}) {
  const classes = useStyles();

  return (
    <div className={classes.graphFrame}>
      {hideGraph ? (
        <div className={classes.graphTitle}>{alternativeDesc}</div>
      ) : (
        <div className={classes.graphContainer}>
          <div className={classes.graphTitle}>{title}</div>
          <div className={classes.graphLine} />
          <div className={classes.graphBar}>{children}</div>
        </div>
      )}
    </div>
  );
}
