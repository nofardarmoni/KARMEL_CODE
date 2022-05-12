import React, { useMemo, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { GraphFrame } from "@core";
import {
  calculateTotalPopulation,
  deepCompareMemo,
  isPrecise,
  numberWithCommas,
  polygonToWKT,
} from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import { dataName, sirensStatuses } from "@constants";

const useStyles = makeStyles(() => ({
  averageTimeDesc: {
    fontSize: "23px",
    fontFamily: "AlmoniBold",
    marginTop: "5%",
    color: "#FF3333",
  },
  biggerFont: {
    fontSize: "200%",
  },
}));

function NotAlertedPopulationGraph({ event }) {
  const classes = useStyles();
  const dataCache = useRef({});

  const { data: disabledSirensPolygons } = useApiQuery({
    dataPath: "sirens/get-sirens",
    label: "שכבת צופרים מושבתים",
    body: {
      wktPolygon: polygonToWKT(event?.polygon),
      status: sirensStatuses.disabled.value,
      voltage: false,
    },
    options: {
      select: (data) =>
        data.flatMap((siren) => (siren.coverage ? [siren.coverage] : [])),
    },
  });

  const { data: disabledVoltageSirensPolygons } = useApiQuery({
    dataPath: "sirens/get-sirens",
    label: "שכבת צופרים מושבתי מתח רשת",
    body: {
      wktPolygon: polygonToWKT(event?.polygon),
      status: sirensStatuses.disabled.value,
      voltage: true,
    },
    options: {
      select: (data) =>
        data.flatMap((siren) =>
          siren.coverage && siren.alertCount === 0 ? [siren.coverage] : []
        ),
    },
  });

  const polygons = [
    ...(disabledSirensPolygons ?? []),
    ...(disabledVoltageSirensPolygons ?? []),
  ];

  const { data } = useApiQuery({
    dataPath: `layers/${dataName}`,
    label: "אוכלוסייה ללא התרעה",
    fetchOnce: true,
    body: {
      polygon: polygons,
      isPrecise: isPrecise(event),
      isNotAlerted: true,
    },
    options: {
      enabled: polygons.length > 0,
      placeholderData: dataCache.current,
      onSuccess: (data) => (dataCache.current = data),
    },
  });

  const totalCount = useMemo(() => calculateTotalPopulation(data ?? {}), [
    data,
  ]);

  return (
    <GraphFrame
      hideGraph={!totalCount}
      title="כמות אוכלוסייה ללא התרעה"
      alternativeDesc={"אין נתונים על אוכלוסייה ללא התרעה"}
    >
      <div className={classes.averageTimeDesc}>
        <span>{"כ- "}</span>
        <span className={classes.biggerFont}>
          {numberWithCommas(totalCount)}
        </span>
        <span>{" אנשים"}</span>
      </div>
    </GraphFrame>
  );
}

export default deepCompareMemo(NotAlertedPopulationGraph);
