import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./waterIcons";
import { CustomPopup } from "@core";
import { useRecoilValue, selector, useRecoilState } from "recoil";
import axios from "axios";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";
import { EcoTwoTone } from "@material-ui/icons";

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
export function statecalc(mode, percent, realValue, calcReal) {
  if (mode === "realtime") {
    return calcReal;
  }
  const res = calc(percent, realValue);

  return res;
}

function WaterLayer() {
  const mode = useRecoilValue(earthquakeState);
  const predectitionState = useRecoilState(earthquakeState);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );
  const [magntideRangeState, setMagntideRangeState] = useState(null);

  const classes = useStyles();
  const [waterStationsData, setWaterStationsData] = useState([]);
  const [currentLevelOfFunctioning, setCurrentLevelOfFunctioning] = useState(
    ""
  );
  const [backgroundColorMaker, setBackgroundColorMaker] = useState(
    "blue-water-icon"
  );
  useEffect(() => getMagnitodeRange());
  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/waterStations`)
      .then((res) => setWaterStationsData(res.data.recordset));
  }, []);

  const calculatePredection = (waterStation) => {};

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

  const getMarkerColor = (levelOfFunctioning) => {
    if (newMagnitodeState < 4.5) {
      return "blue-water-icon";
    }
    if (levelOfFunctioning <= 50) {
      return "red-water-icon";
    } else if (levelOfFunctioning < 92) {
      return "orange-water-icon";
    } else {
      return "blue-water-icon";
    }
  };

  if (!waterStationsData) return null;

  return (
    <>
      {waterStationsData.map((waterStation) => (
        <Marker
          key={waterStation.WATER_KEY}
          position={[waterStation.WATER_NZLEFT, waterStation.WATER_NZRIGHT]}
          eventHandlers={{
            click: (_) => {
              if (mode !== "realtime") {
                getMarkerColor(
                  100 -
                    statecalc(
                      mode,
                      waterStation[magntideRangeState],
                      100,
                      100 - waterStation.WATER_RAMAT_TIPKUD
                    )
                );
                newMagnitodeState && calc(waterStation[magntideRangeState]);
              }
            },
          }}
          icon={
            icons[
              getMarkerColor(
                100 -
                  statecalc(
                    mode,
                    waterStation[magntideRangeState],
                    100,
                    100 - waterStation.WATER_RAMAT_TIPKUD
                  )
              )
            ]
          }
        >
          <CustomPopup closeButton={false}>
            <div className={classes.tootlipTitle}>
              רשות - {waterStation.WATER_RASHUT}
            </div>
            <div className={classes.tootlipContent}>
              {toolTipDataNames.map(
                (row, _) =>
                  (!row.isConditional ||
                    (row.isConditional &&
                      (parseFloat(waterStation["WATER_RAMAT_TIPKUD"]) ?? 0) <
                        100)) && (
                    <div key={row.key}>
                      {row.title}

                      {waterStation["WATER_RAMAT_TIPKUD"] < "100" &&
                        row.key === "WATER_ZMAN_TIKUN_DAYS" &&
                        100 -
                          statecalc(
                            mode,
                            waterStation[magntideRangeState],
                            100,
                            100 - waterStation.WATER_RAMAT_TIPKUD
                          ) +
                          "%" ===
                          "100%" &&
                        ""}

                      {row.key === "WATER_RAMAT_TIPKUD"
                        ? 100 -
                          statecalc(
                            mode,
                            waterStation[magntideRangeState],
                            100,
                            100 - waterStation.WATER_RAMAT_TIPKUD
                          ) +
                          "%"
                        : row.key === "WATER_TUSHVIM_NO_WATER"
                        ? parseInt(
                            statecalc(
                              mode,
                              waterStation[magntideRangeState],
                              waterStation.WATER_TUSHAVIM,
                              waterStation.WATER_REAL_TUSHAVIM
                            )
                          )
                        : row.key === "WATER_TAHANUT_HALUKA"
                        ? Math.round(
                            statecalc(
                              mode,
                              waterStation[magntideRangeState],
                              waterStation.WATER_TUSHAVIM,
                              waterStation.WATER_REAL_TUSHAVIM
                            ) / 2000
                          )
                        : waterStation[row.key]}
                    </div>
                  )
              )}
            </div>
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

const getRowValue = (obj) => {};

export default deepCompareMemo(WaterLayer);
