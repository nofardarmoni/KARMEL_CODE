import React from "react";
import { MapContainer, AttributionControl } from "react-leaflet";
import {
  defaultCenter,
  defaultZoom,
  maxBounds,
  maxZoom,
  minZoom,
} from "@constants";
import MapLocationSaver from "./MapLocationSaver";
import { makeStyles } from "@material-ui/core";
import MapFlyTo from "./MapFlyTo";
import MapSelector from "./MapSelector";

const useStyles = makeStyles(() => ({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export default function MainMap({ isFlyTo, children }) {
  const classes = useStyles();

  return (
    <MapContainer
      className={classes.map}
      center={getInitialCenter()}
      zoom={getInitialZoom()}
      zoomControl={false}
      preferCanvas={true}
      minZoom={minZoom}
      maxZoom={maxZoom}
      maxBounds={maxBounds}
      maxBoundsViscosity={1}
      attributionControl={false}
    >
      <MapSelector />
      {isFlyTo && <MapFlyTo />}
      <MapLocationSaver />

      <AttributionControl prefix={false} position={"bottomright"} />
      {children}
    </MapContainer>
  );
}

const getInitialCenter = () => {
  const centerString = localStorage.getItem("center") ?? "";

  const locationArrayPattern =
    /^\[([0-9]{1,2}(\.[0-9]+)?)+,([0-9]{1,2}(\.[0-9]+)?)+\]$/;

  return centerString.match(locationArrayPattern)
    ? JSON.parse(centerString)
    : defaultCenter;
};

const getInitialZoom = () => {
  return !isNaN(parseInt(localStorage.getItem("zoom")))
    ? parseInt(localStorage.getItem("zoom"))
    : defaultZoom;
};
