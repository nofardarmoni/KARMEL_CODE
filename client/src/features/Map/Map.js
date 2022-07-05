import React from "react";
import { MapContainer, AttributionControl, Circle } from "react-leaflet";
import {
  defaultCenter,
  defaultZoom,
  maxBounds,
  maxZoom,
  minZoom,
} from "@constants";
import MapLocationSaver from "./MapLocationSaver";
import { Box, makeStyles } from "@material-ui/core";
import MapFlyTo from "./MapFlyTo";
import MapSelector from "./MapSelector";
import { earthquakeState } from "@states/earthquakeState";
import { useRecoilValue } from "recoil";

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
  const mode = useRecoilValue(earthquakeState);

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
      {mode === "predictMode" && (
        <>
          <Circle
            center={[32.496963346788945, 35.5678939819336]}
            radius={10000}
            color="red"
          />
          <Circle
            center={[32.496963346788945, 35.5678939819336]}
            radius={20000}
            color="orange"
          />
          <Circle
            center={[32.496963346788945, 35.5678939819336]}
            radius={30000}
            color="green"
          />
          <Circle
            center={[32.496963346788945, 35.5678939819336]}
            radius={40000}
            color="white"
          />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
          position: "absolute",
          backgroundColor: "#191919",
          top: 100,
          right: 40,
          width: 230,
          height: 200,
          borderRadius: 5,
          color: "white",
          paddingTop: 5,
          paddingRight: 10,
          textAlign: "center",
        }}
      >
        מקרא
        <img
          height={20}
          width={20}
          src="icons/layers/Electric/lightning-green.png"
        />
      </Box>
    </MapContainer>
  );
}

const getInitialCenter = () => {
  const centerString = localStorage.getItem("center") ?? "";

  const locationArrayPattern = /^\[([0-9]{1,2}(\.[0-9]+)?)+,([0-9]{1,2}(\.[0-9]+)?)+\]$/;

  return centerString.match(locationArrayPattern)
    ? JSON.parse(centerString)
    : defaultCenter;
};

const getInitialZoom = () => {
  return !isNaN(parseInt(localStorage.getItem("zoom")))
    ? parseInt(localStorage.getItem("zoom"))
    : defaultZoom;
};
