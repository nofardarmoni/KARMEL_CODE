import React, { useMemo, useRef } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./waterIcons";
import { CustomPopup } from "@core";

const data = [
  {
    WATER_KEY: "1",
    WATER_TAAGID: "הרי נצרת",
    WATER_RASHUT: "נצרת",
    WATER_NZRIGHT: "32.69764094981775",
    WATER_NZLEFT: "32.697639465332",
    WATER_MAHOZ: "חיפה",
    WATER_TUSHVIM: "80000",
    WATER_TUSHVIM_NO_WATER: "56000",
    WATER_NEZEK_BAMITKAN: "סדקים",
    WATER_RAMAT_TIFKUD_PRECENT: "0.300000011920929",
    WATER_RAMAT_HERUM: "4",
    WATER_TAHANUT_HALUKA: "40",
    WATER_ZMAN_TIKUN_DAYS: "10",
  },
];

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
    key: "WATER_TUSHVIM",
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
    title: "צפי תיקון -",
    isConditional: true,
  },
  {
    key: "WATER_TAHANUT_HALUKA",
    title: "מספר תחנות חלוקה בעת מצב חירום -",
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

const getDate = (lastUpdateTime) => {
  const parsedDate = Date.parse(lastUpdateTime);

  if (!parsedDate) return "לא קיים";

  const date = new Date(parsedDate);
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
};

function WaterLayer({ layerKey, label, polygon, distance, showId }) {
  const classes = useStyles();
  // const layerCache = useRef([]);

  if (!data) return null;
  return (
    <>
      {data.map((waterStation) => (
        <Marker
          key={waterStation.WATER_KEY}
          position={[waterStation.WATER_NZRIGHT, waterStation.WATER_NZLEFT]}
          icon={icons["waterIcon"]}
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
                      waterStation["WATER_RAMAT_TIFKUD_PRECENT"] < "100")) && (
                    <div key={row.key}>
                      {row.title} {waterStation[row.key]}
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
