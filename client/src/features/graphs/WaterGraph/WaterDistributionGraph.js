import React, { useEffect, useMemo, useRef, useState } from "react";
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
import axios from "axios";
import { statecalc } from "@layers/Water/WaterLayer";
import { useRecoilState, useRecoilValue } from "recoil";
import { earthquakeState, magnitodeState } from "@states/earthquakeState";

const useStyles = makeStyles(() => ({
  averageTimeDesc: {
    fontSize: "23px",
    fontFamily: "AlmoniBold",
    marginTop: "5%",
    color: "white",
  },
  biggerFont: {
    fontSize: "200%",
  },
}));

function WaterDistributionGraph({ event }) {
  const classes = useStyles();
  const dataCache = useRef({});
  const mode = useRecoilValue(earthquakeState);
  const [magntideRangeState, setMagntideRangeState] = useState(null);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );
  const getMagnitodeRange = () => {
    if (newMagnitodeState >= 4.5 && newMagnitodeState <= 4.9) {
      setMagntideRangeState("MAGNITODA_4_5_4_9");
    } else if (newMagnitodeState >= 5 && newMagnitodeState <= 6.5) {
      setMagntideRangeState("MAGNITODA_5_6_5");
    } else if (newMagnitodeState >= 6.6 && newMagnitodeState <= 7) {
      setMagntideRangeState("MAGNITODA_6_6_7");
    } else if (newMagnitodeState >= 7.1 && newMagnitodeState <= 7.5) {
      setMagntideRangeState("MAGNITODA_7_1_7_5");
    } else {
      setMagntideRangeState("MAGNITODA_7_6_to_top");
    }
  };

  const [waterStationsData, setWaterStationsData] = useState([]);

  useEffect(() => getMagnitodeRange());

  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/waterStations`)
      .then((res) => setWaterStationsData(res.data.recordset));
  }, []);

  const totalCount =
    waterStationsData?.reduce(
      (acc, waterStation) =>
        acc +
        parseInt(
          statecalc(
            mode,
            waterStation[magntideRangeState],
            waterStation.WATER_TUSHAVIM,
            waterStation.WATER_REAL_TUSHAVIM
          )
        ),
      0
    ) * 4;

  return (
    <GraphFrame
      hideGraph={!totalCount || newMagnitodeState < 4.5}
      title="כמות ליטרים לחלוקה ליום"
      alternativeDesc={"אין נתונים על כמות ליטרים"}
    >
      <div className={classes.averageTimeDesc}>
        <span>{"כ- "}</span>
        <span className={classes.biggerFont}>
          {numberWithCommas(totalCount)}
        </span>
        <span>{" ליטרים"}</span>
      </div>
    </GraphFrame>
  );
}

export default deepCompareMemo(WaterDistributionGraph);
