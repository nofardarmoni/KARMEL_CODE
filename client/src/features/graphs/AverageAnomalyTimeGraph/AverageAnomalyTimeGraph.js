import React, { useEffect, useState } from "react";
import { fetchData, REQUEST_METHODS } from "@services/api-service";
import { GraphFrame } from "@core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  averageTimeDesc: {
    fontSize: "20px",
    fontFamily: "AlmoniBold",
    color: "#FF3333",
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  biggerFont: {
    fontSize: "200%",
  },
}));

export default function AverageAnomalyTimeGraph() {
  const classes = useStyles();
  const [averageTime, setAverageTime] = useState(0);

  const fetchSirenAnomalies = () => {
    fetchData("sirenAnomalies", REQUEST_METHODS.all, "חריגות")
      .then(parseAnomaliesTimeAverage)
      .then(setAverageTime)
      .catch((error) => {
        console.log(
          error.response && error.response.status !== 404
            ? `שגיאה: ${error.response.data}`
            : "חלה שגיאה בטעינת החריגות"
        );
      });
  };

  const getAnomalyTime = (fail) =>
    (new Date(fail.EndDate) - new Date(fail.ExpirationDate)) / (1000 * 60 * 60);

  const parseAnomaliesTimeAverage = (anomalies) =>
    anomalies.reduce((sum, fail) => sum + getAnomalyTime(fail), 0) /
    anomalies.length;

  const extractMinutes = (time) => Math.round((time % 1) * 60);

  useEffect(() => {
    fetchSirenAnomalies()
    // temp fix - because graph is not used:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(fetchSirenAnomalies, []);

  return (
    <GraphFrame title="זמן חריגה ממוצע" alternativeDesc={"אין נתוני תקלות"}>
      <div className={classes.averageTimeDesc}>
        <div>
          <span>{"כ-"}</span>
          <span className={classes.biggerFont}>{Math.floor(averageTime)}</span>
          <span>{" שעות"}</span>
        </div>
        <div>
          <span>{"ו-"}</span>
          <span className={classes.biggerFont}>
            {extractMinutes(averageTime)}
          </span>
          <span>{" דקות"}</span>
        </div>
      </div>
    </GraphFrame>
  );
}
