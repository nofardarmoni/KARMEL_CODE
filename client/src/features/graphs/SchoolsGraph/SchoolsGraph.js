import React, { useState } from "react";
// import { polygonToWKT } from "@services";
import { GraphFrame } from "@core";
// import { fetchData, REQUEST_METHODS } from "@services/api-service";
import { makeStyles } from "@material-ui/core";

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

export default function SchoolsGraph({ polygon }) {
  const defaultData = [
    {
      institute: "גני ילדים",
      amount: 0,
      percent: (1 / randomNumber(600, 1000)) * 7,
    },
    {
      institute: "בתי ספר יסודיים",
      amount: 0,
      percent: (1 / randomNumber(800, 1200)) * 7,
    },
    {
      institute: "תיכונים",
      amount: 0,
      percent: (1 / randomNumber(1200, 1600)) * 7,
    },
  ];

  const [data] = useState(defaultData);

  return (
    <GraphFrame
      title={`מוסדות לימוד`}
      // hideGraph={data.every((entry) => entry.amount === 0)}
      hideGraph={true}
      alternativeDesc={"אין נתונים על מוסדות באיזור"}
    >
      <SchoolsCustomChart data={data} />
    </GraphFrame>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    direction: "rtl",
    fontSize: 23,
    fontFamily: "AlmoniBold",
    paddingTop: 10,
  },
  kinder: {
    color: "orange",
  },
  elementary: {
    color: "cyan",
  },
  high: {
    color: "red",
  },
}));

const institutesTranslator = {
  "גני ילדים": "kinder",
  "בתי ספר יסודיים": "elementary",
  תיכונים: "high",
};

function SchoolsCustomChart(props) {
  const classes = useStyles();
  const institutes = props.data;

  return (
    <div className={classes.root}>
      {institutes.map((institute) => (
        <div
          key={institute.institute}
          className={classes[institutesTranslator[institute.institute]]}
        >
          {institute.amount} {institute.institute}
        </div>
      ))}
    </div>
  );
}
