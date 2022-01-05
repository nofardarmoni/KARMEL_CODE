import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { deepCompareMemo } from "@services";
import HospitalPopup from "./HospitalPopup";
import { useApiQuery } from "@hooks/useApiQuery";

const useStyles = makeStyles(() => ({
  notBusy: {
    filter: "hue-rotate(210deg) brightness(200%)",
  },
  busyBlink: {
    filter: "saturate(50%)",
    animation: "$toggle 1s infinite alternate",
  },
  "@keyframes toggle": {
    "50%": {
      filter: "saturate(50%)",
    },
    "75%": {
      filter: "saturate(100%)",
    },
    "100%": {
      filter: "saturate(100%)",
    },
  },
}));

function HospitalsLayer({ polygon, distance }) {
  const classes = useStyles();
  const layerCache = useRef([]);
  const getHospitalIcon = (status) =>
    L.icon({
      iconSize: [30, 30],
      iconUrl: "icons/layers/hospitals/hospital.svg",
      className: status ? classes.busyBlink : classes.notBusy,
    });

  const { data } = useApiQuery({
    dataPath: "layers/hospitals",
    label: "בתי חולים",
    body: polygon && {
      polygon,
      distanceFromPolygon: distance,
    },
    fetchOnce: true,
    options: {
      placeholderData: layerCache.current,
    },
  });

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;
  return (
    <>
      {data.map((hospital) => (
        <Marker
          key={hospital.id}
          position={[hospital.latitude, hospital.longitude]}
          icon={getHospitalIcon(hospital.isBusy)}
        >
          <HospitalPopup hospital={hospital} />
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(HospitalsLayer);
