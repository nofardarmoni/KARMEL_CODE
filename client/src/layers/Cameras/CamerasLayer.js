import React, { useState, useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { CustomPopup, VideoPlayer } from "@core";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { useApiQuery } from "@hooks/useApiQuery";

const useStyles = makeStyles(() => ({
  cameraTitle: {
    textAlign: "center",
    color: "white",
    marginTop: -10,
    marginBottom: -5,
    fontFamily: "AlmoniBold",
    fontSize: 17,
  },
  camera: {
    marginRight: -15,
    marginLeft: -15,
    marginBottom: -10,
  },
}));

function CamerasLayer({ polygon, distance }) {
  const classes = useStyles();
  const layerCache = useRef([]);
  const [currentCamera, setCurrentCamera] = useState();

  const { data } = useApiQuery({
    dataPath: "layers/cameras",
    label: "מצלמות",
    body: polygon && {
      polygon,
      distanceFromPolygon: distance,
    },
    options: { placeholderData: layerCache.current },
  });

  const iconsUrl = "icons/layers/cameras/";

  const displayedCameraIcon = L.icon({
    // put in a separate file
    iconUrl: `${iconsUrl}camera.png`,
    iconSize: [20, 20],
  });

  const cameraIcon = L.icon({
    iconUrl: `${iconsUrl}camera-gray.png`,
    iconSize: [20, 20],
  });

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;
  return (
    <>
      {data.map((camera) => (
        <Marker
          key={camera.link}
          position={[camera.latitude, camera.longitude]}
          icon={
            currentCamera && camera.link === currentCamera.link
              ? displayedCameraIcon
              : cameraIcon
          }
          eventHandlers={{
            click: () => setCurrentCamera(camera),
          }}
        >
          <CustomPopup>
            <div className={classes.cameraTitle}>{camera.name}</div>
            <div className={classes.camera}>
              <VideoPlayer cameraLink={camera.link} />
            </div>
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(CamerasLayer);
