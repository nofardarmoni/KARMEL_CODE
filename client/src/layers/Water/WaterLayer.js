import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./waterIcons";
import { CustomPopup } from "@core";
import { useRecoilValue, selector, useRecoilState } from "recoil";
import axios from "axios";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";

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
    key: "WATER_RAMAT_TIFKUD_PRECENT",
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
  },
];

// const value = selector({
//   key: 'earthquakeState',
//   get: ({get}) => get(earthquakeState)
// })

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

// const getDate = (lastUpdateTime) => {
//   const parsedDate = Date.parse(lastUpdateTime);

//   if (!parsedDate) return "לא קיים";

//   const date = new Date(parsedDate);
//   const day = date
//     .getDate()
//     .toString()
//     .padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear().toString();

//   return `${day}/${month}/${year}`;
// };

function WaterLayer() {
  const val = useRecoilValue(earthquakeState);
  const predectitionState = useRecoilState(earthquakeState);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );

  const classes = useStyles();
  const [waterStationsData, setWaterStationsData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/waterStations`)
      .then((res) => setWaterStationsData(res.data.recordset));
  }, []);

  const calculatePredection = (waterStation) => {
    console.log(`waterStation: ${waterStation}`);
  };

  if (!waterStationsData) return null;
  return (
    <>
      {waterStationsData.map((waterStation) => (
        <Marker
          key={waterStation.WATER_KEY}
          position={[waterStation.WATER_NZLEFT, waterStation.WATER_NZRIGHT]}
          icon={icons["waterIcon"]}
          eventHandlers={{
            click: (_) => {
              console.log("waterStation: ", waterStation);
            },
          }}
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
                      (waterStation["WATER_RAMAT_TIFKUD_PRECENT"] ?? 0) <
                        "100")) && (
                    <div key={row.key}>
                      {row.title} {waterStation[row.key] ?? newMagnitodeState}
                      {/* {waterStation[row.key] === 'WATER_TUSHAVIM' && calculatePredection(waterStation)} */}
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

export default deepCompareMemo(WaterLayer);
