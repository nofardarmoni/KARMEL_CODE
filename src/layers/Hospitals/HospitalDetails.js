import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  details: {
    textAlign: "right",
    fontSize: 14,
    color: "white",
  },
  detail: {
    fontWeight: "bold",
  },
  scroll: {
    overflow: "auto",
    height: 246,
  },
}));

export default function HospitalDetails({ hospital, hospitalDetails }) {
  const classes = useStyles();

  return (
    <div className={classes.scroll}>
      {Object.keys(hospital).map(
        (detail) =>
          hospitalDetails[detail] &&
          hospital[detail] !== null && (
            <div key={detail} className={classes.details}>
              <span className={classes.detail}>
                {`${hospitalDetails[detail].label}: `}
              </span>
              <span>
                {hospitalDetails[detail].parser?.(hospital[detail]) ??
                  hospital[detail]}
              </span>
            </div>
          )
      )}
    </div>
  );
}
