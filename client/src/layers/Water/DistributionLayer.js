import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./waterIcons";
import { CustomPopup } from "@core";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";

function randomGeo(center, radius = 2000) {
  const y0 = center.latitude;
  const x0 = center.longitude;
  const rd = radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  return [y + y0, x + x0];
}

const peopeleAffectedAmount = {
  "1": 0.08,
  "2": 0.23,
  "3": 0.5,
  "4": 0.82,
  "5": 1,
};

const toolTipDataNames = [
  {
    key: "WATER_TAAGID",
    title: "תאגיד מים -",
  },
  {
    key: "WATER_MAHOZ",
    title: 'מחוז פקע"ר -',
  },
  {
    key: "WATER_TUSHAVIM",
    title: 'סה"כ מספר תושבים -',
  },
  {
    key: "WATER_RAMAT_TIPKUD",
    title: "רמת תפקוד -",
  },
  {
    key: "WATER_TUSHVIM_NO_WATER",
    title: "מספר תושבים ללא מים -",
  },
  {
    key: "WATER_ZMAN_TIKUN_DAYS",
    title: "צפי תיקון בימים -",
    isConditional: true,
  },
  {
    key: "WATER_TAHANUT_HALUKA",
    title: "מספר תחנות חלוקה בעת מצב חירום -",
    isConditional: true,
  },
  {
    key: "liters",
    title: "מספר ליטרים לחלוקה -",
    isConditional: true,
  },
];

const useStyles = makeStyles(() => ({
  tootlipTitle: {
    fontSize: 18,
    fontFamily: "AlmoniBold",
    display: "flex",
    justifyContent: "center",
  },
  tootlipContent: {
    fontSize: 14,
    fontFamily: "AlmoniBold",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function myParse(v) {
  if (typeof v == "string") {
    v = v.replace(",", "");
    return parseInt(v);
  }
  return v;
}

export const calc = (magntiodeRangeValue, waterT) => {
  const precentegeDamage = peopeleAffectedAmount[magntiodeRangeValue];
  const poduct = myParse(waterT) * precentegeDamage;

  return poduct;
};
export function statecalc(mode, percent, realValue, calcReal, newMagnitodeState) {
  if (mode === "realtime" || newMagnitodeState < 4.5) {
    return calcReal;
  }
  const res = calc(percent, realValue);

  return res;
}

const getRandomMarkers = (waterStation, mode, magntideRangeState, newMagnitodeState) => {
  const numOfStations = Math.round(
    statecalc(
      mode,
      waterStation[magntideRangeState],
      waterStation.WATER_TUSHAVIM,
      waterStation.WATER_REAL_TUSHAVIM,
      newMagnitodeState
    ) / 2000);

  const randomMarkers = [];
  for (let i = 0; i < numOfStations; i++) {
    randomMarkers.push(randomGeo({ latitude: waterStation.WATER_NZLEFT, longitude: waterStation.WATER_NZRIGHT }));
  }

  return randomMarkers.map((marker, index) => <Marker key={index} position={marker} icon={icons.default} />)
}

function DistributionLayer() {
  const mode = useRecoilValue(earthquakeState);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );
  const [magntideRangeState, setMagntideRangeState] = useState(null);

  const [waterStationsData, setWaterStationsData] = useState([]);

  useEffect(() => getMagnitodeRange());
  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/waterStations`)
      .then((res) => setWaterStationsData(res.data.recordset));
  }, []);

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


  if (!waterStationsData) return null;

  return (
    <>
      {waterStationsData.map((waterStation) => (
        <React.Fragment key={waterStation.WATER_KEY}>
          {getRandomMarkers(waterStation, mode, magntideRangeState, newMagnitodeState)}
        </React.Fragment>
      ))}
    </>
  );
}

export default deepCompareMemo(DistributionLayer);
