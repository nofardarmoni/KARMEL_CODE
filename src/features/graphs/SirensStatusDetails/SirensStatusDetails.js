import React from "react";
import { GraphFrame } from "@core";
import { makeStyles } from "@material-ui/core";
import { sirensStatusLegend } from "./SirensStatusLegend";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "right",
    color: "white",
    width: 150,
    marginRight: -25,
    marginLeft: 5,
    fontSize: 12,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 4,
    marginTop: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "AlmoniBold",
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  oragne: {
    color: "orange",
  },
  grey: {
    color: "grey",
  },
}));

const getErrorsList = (errorsArray) => {
  return [errorsArray.slice(0, -1).join(", "), errorsArray.slice(-1)[0]].join(
    errorsArray.length < 2 ? "" : " ו"
  );
};

export default function SirensStatusDateiles() {
  const classes = useStyles();
  return (
    <GraphFrame
      showGraph
      title="מקרא סטטוס צופר"
      alternativeDesc={"אין נתונים"}
    >
      <div className={classes.root}>
        <div>
          <span className={`${classes.title} ${classes.oragne}`}>
            {sirensStatusLegend.minor.name}:
          </span>
          {getErrorsList(sirensStatusLegend.minor.list)}
        </div>
        <div className={classes.seperator}></div>
        <div>
          <span className={`${classes.title} ${classes.red}`}>
            {sirensStatusLegend.declined.name}:
          </span>
          {getErrorsList(sirensStatusLegend.declined.list)}
        </div>
        <div className={classes.seperator}></div>
        <div>
          <span className={`${classes.title} ${classes.grey}`}>
            {sirensStatusLegend.disabled.name}:
          </span>
          {getErrorsList(sirensStatusLegend.disabled.list)}
        </div>
      </div>
    </GraphFrame>
  );
}
