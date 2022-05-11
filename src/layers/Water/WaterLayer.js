import React, { useMemo, useRef } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo, polygonToWKT } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./waterIcons";
import { CustomPopup } from "@core";
// import { useApiQuery } from "@hooks/useApiQuery";

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

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
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
  const layerCache = useRef([]);

  const polygonWKT = useMemo(() => polygonToWKT(polygon), [polygon]);

  //   const { data } = useApiQuery({
  //     dataPath: `water/${polygon ? "polygon/" : ""}${layerKey}`,
  //     label,
  //     body: polygon && {
  //       polygon: polygonWKT,
  //       distance,
  //     },
  //     options: {
  //       placeholderData: layerCache.current,
  //       onSuccess: (data) => (layerCache.current = data),
  //     },
  //   });

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
            <div className={classes.title}>
              מחוז: {waterStation.WATER_MAHOZ}
            </div>
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(WaterLayer);
