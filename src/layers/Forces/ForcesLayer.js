import React, { useMemo, useRef } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo, polygonToWKT } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./icons";
import { CustomPopup } from "@core";
import { useApiQuery } from "@hooks/useApiQuery";

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

const getTime = (lastUpdateTime) => {
  const parsedDate = Date.parse(lastUpdateTime);

  if (!parsedDate) return "לא קיים";

  const date = new Date(parsedDate);
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}`;
};

function ForcesLayer({ layerKey, label, polygon, distance, showId }) {
  const classes = useStyles();
  const layerCache = useRef([]);

  const polygonWKT = useMemo(() => polygonToWKT(polygon), [polygon]);

  const { data } = useApiQuery({
    dataPath: `forces/${polygon ? "polygon/" : ""}${layerKey}`,
    label,
    body: polygon && {
      polygon: polygonWKT,
      distance,
    },
    options: {
      placeholderData: layerCache.current,
      onSuccess: (data) => (layerCache.current = data),
    },
  });

  if (!data) return null;
  return (
    <>
      {data.map(
        (force) =>
          force.force_id &&
          force.latitude &&
          force.longitude && (
            <Marker
              key={force.force_id}
              position={[force.latitude, force.longitude]}
              icon={
                icons[layerKey]?.[force.sub_type_desc] ??
                icons[layerKey]?.default ??
                icons.default
              }
            >
              <CustomPopup closeButton={false}>
                <div className={classes.title}>כוח {label}</div>
                {showId && (
                  <div className={classes.title}>מזהה: {force.force_id}</div>
                )}
                {force.sub_type_desc && (
                  <div className={classes.title}>
                    סוג: {force.sub_type_desc}
                  </div>
                )}
                <div className={classes.title}>
                  תאריך עדכון אחרון: {getDate(force.report_time)}
                </div>
                <div className={classes.title}>
                  שעת עדכון אחרון: {getTime(force.report_time)}
                </div>
                {force.status_desc && (
                  <div className={classes.title}>
                    סטטוס: {force.status_desc}
                  </div>
                )}
              </CustomPopup>
            </Marker>
          )
      )}
    </>
  );
}

export default deepCompareMemo(ForcesLayer);
