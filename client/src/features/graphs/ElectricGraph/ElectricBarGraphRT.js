import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { GraphFrame, VerticalBarChart } from "@core";
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
    color: "#FF3333",
  },
  biggerFont: {
    fontSize: "200%",
  },
}));

function ElectricBarGraph({}) {
  const classes = useStyles();
  const dataCache = useRef({});
  const mode = useRecoilValue(earthquakeState);
  const [magntideRangeState, setMagntideRangeState] = useState(null);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );

  const getMagnitodeRange = () => {
    if (newMagnitodeState >= 4.5 && newMagnitodeState <= 4.9) {
      setMagntideRangeState("ELEC_MAGNITDE_4_5_4_9");
    } else if (newMagnitodeState >= 5 && newMagnitodeState <= 6.5) {
      setMagntideRangeState("ELEC_MAGNITDE_4_6_6_5");
    } else if (newMagnitodeState >= 6.6 && newMagnitodeState <= 7) {
      setMagntideRangeState("ELEC_MAGNITDE_6_6_7");
    } else if (newMagnitodeState >= 7.1 && newMagnitodeState <= 7.5) {
      setMagntideRangeState("ELEC_MAGNITDE_7_1_7_5");
    } else {
      setMagntideRangeState("ELEC_MAGNITDE_UP_TO_7_6");
    }
  };

  const [electricStationsData, setElectricStationsData] = useState([]);

  useEffect(() => {
    getMagnitodeRange();
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/electricStations`)
      .then((res) => setElectricStationsData(res.data.recordset));
  }, []);
  const graphData = electricStationsData
    ?.map((electricStation) => ({
      rashut: electricStation.ELEC_STATION_NAME,
      count:
        100 -
        statecalc(
          mode,
          electricStation[magntideRangeState],
          100,
          100 - parseInt(electricStation.ELEC_RAMAT_TIFKUD)
        ),
    }))
    .sort((a, b) => a.count - b.count);

  return (
    <GraphFrame
      hideGraph={graphData?.length === 0 || newMagnitodeState < 4.5}
      title='פילוח תחנות כח ע"פ רמות תפקוד'
      alternativeDesc={"אין נתונים על תחנות כח"}
    >
      <VerticalBarChart
        data={graphData}
        xAxisLabel="תחנת כוח"
        yAxisLabel="(%) תפקוד"
        subTitle="%"
        subLabel="רמת תפקוד"
      />
    </GraphFrame>
  );
}

export default deepCompareMemo(ElectricBarGraph);
