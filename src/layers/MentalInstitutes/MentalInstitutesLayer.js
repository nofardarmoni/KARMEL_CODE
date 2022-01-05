import React, { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { makeStyles } from "@material-ui/core";
import { deepCompareMemo } from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import details from "./popupDetails.json";
import { CustomPopup } from "@core";

const useStyles = makeStyles(() => ({
  details: {
    textAlign: "right",
    fontSize: 14,
    color: "white",
  },
  detail: {
    fontWeight: "bold",
  },
}));

function MentalInstitutesLayer({ polygon, distance }) {
  const classes = useStyles();
  const layerCache = useRef([]);

  const iconsUrl = "icons/layers/mental-health/";
  const icon = L.icon({
    iconSize: [25, 25],
    iconUrl: `${iconsUrl}mental-health.png`,
  });

  const { data } = useApiQuery({
    dataPath: "layers/mentalinstitutes",
    label: "בריאות הנפש",
    body: polygon && {
      polygon,
      distanceFromPolygon: distance,
    },
    fetchOnce: true,
    options: {
      placeholderData: layerCache.current,
      select: (data) =>
        data.filter((datum) => datum.latitude && datum.longitude),
    },
  });

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;
  return (
    <>
      {data.map((datum) => (
        <Marker
          key={datum.OBJECTID}
          position={[datum.latitude, datum.longitude]}
          icon={icon}
        >
          <CustomPopup>
            {Object.keys(details).map(
              (detail) =>
                details[detail] &&
                datum[detail] !== null && (
                  <div key={detail} className={classes.details}>
                    <span className={classes.detail}>
                      {`${details[detail]}: `}
                    </span>
                    <span>{datum[detail]}</span>
                  </div>
                )
            )}
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(MentalInstitutesLayer);
