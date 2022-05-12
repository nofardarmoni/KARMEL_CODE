import React, { useEffect, useMemo, useState } from "react";
import { Marker, Polyline, Tooltip, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";

const displayDistance = (distance) => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(2)} ק"מ`;
  }

  if (distance < 1000 && distance > 0) {
    return `${distance.toFixed(2)} מ'`;
  }

  return `${distance} מ'`;
};

const displaySumDistance = (distances) => {
  const sum = distances?.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return displayDistance(sum);
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    position: "absolute",
    backgroundColor: "#191919",
    bottom: 110,
    width: 222,
    minHeight: 60,
    maxHeight: "max-content",
    borderRadius: 5,
    textAlign: "start",
    paddingRight: 10,
    color: "white",
    paddingTop: 10,
    fontWeight: "bold",
    top: "100px",
    right: "20px",
    opacity: 0.9,
  },
  title: {
    fontFamily: "AlmoniBold",
    fontSize: 17,
    paddingTop: 20,
  },
  note: {
    fontFamily: "AlmoniBold",
    color: "#c3c3c3",
    fontSize: 13,
    fontStyle: "italic",
    position: "absolute",
    top: 0,
    margin: "5px 0px",
  },
  vertexIcon: {
    filter: "hue-rotate(87deg) contrast(100%) brightness(0.40)",
  },
  button: {
    position: "absolute",
    top: -7,
    left: -7,
    justifyContent: "flex-end",
    color: "#c3c3c3",
  },
  tooltipStyle: {
    color: "white",
    fontSize: "14px",
    fontWeight: 700,
    backgroundColor: "rgba(25,25,25,0.7)",
    borderColor: "grey",
    background: "rgba(25,25,25,0.7)",
    border: "1px",
  },
}));

export default function DistanceMeasurement({ isClickDisabled }) {
  const classes = useStyles();
  const [positions, setPositions] = useState([[]]);
  const [distance, setDistance] = useState([[]]);
  const [positionIndex, setPositionIndex] = useState(0);
  const setDebouncedDistance = useMemo(() => _.debounce(setDistance), []);

  const vertexIcon = L.icon({
    iconUrl: "icons/maps/draw-vertex.png",  
    iconSize: [10, 10],
    className: classes.vertexIcon,
  });

  const mapClickHandler = (event) => {
    if (isClickDisabled) return;

    const coordinates = event.latlng;

    if (
      positions[positionIndex].at(-1) &&
      positions[positionIndex].at(-1)[0] === coordinates.lat &&
      positions[positionIndex].at(-1)[1] === coordinates.lng
    )
      return;

    setPositions((prev) => {
      const positionsCopy = [...prev];
      positionsCopy[positionIndex].push([coordinates.lat, coordinates.lng]);

      return positionsCopy;
    });
  };

  const mapDblClickHandler = () => {
    const length = positions[positionIndex].length;

    if (length < 2) return;

    positions.push([]);
    distance.push([]);
    setPositionIndex((prev) => prev + 1);
  };

  const map = useMapEvent({
    dblclick: mapDblClickHandler,
    click: mapClickHandler,
  });

  const updateDistance = () => {
    const length = positions[positionIndex].length;

    if (length < 2) return;

    setDebouncedDistance((prevDistance) => {
      const addedDistance = [...prevDistance];
      addedDistance[positionIndex]?.push(
        map?.distance(
          positions[positionIndex][length - 2],
          positions[positionIndex][length - 1]
        )
      );

      return addedDistance;
    });
  };

  const handleClear = () => {
    setPositions([[]]);
    setDistance([[]]);
    setPositionIndex(0);
  };

  const disableDoubleClickZoom = () => {
    map.doubleClickZoom.disable();
  };

  useEffect(updateDistance, [
    positionIndex,
    positions,
    map,
    setDebouncedDistance,
  ]);
  useEffect(disableDoubleClickZoom);

  return (
    <>
      {positions[0].length > 0 &&
        positions.map((groupPosition, index) =>
          groupPosition.map((position, innerIndex) => {
            return (
              position && (
                <>
                  <Marker
                    key={innerIndex}
                    icon={vertexIcon}
                    position={position}
                  />
                  {innerIndex > 0 && (
                    <Polyline
                      dashArray="10, 10"
                      color="blue"
                      positions={[
                        groupPosition[innerIndex - 1],
                        groupPosition[innerIndex],
                      ]}
                    >
                      <Tooltip
                        className={classes.tooltipStyle}
                        direction="center"
                        permanent
                      >
                        {distance[index] &&
                          displayDistance(distance[index][innerIndex - 1])}
                      </Tooltip>
                    </Polyline>
                  )}
                </>
              )
            );
          })
        )}

      <div className={`${classes.root} shadow`}>
        <p className={classes.note}>{`* לפתיחת סרגל חדש לחץ לחיצה כפולה`}</p>
        <Typography className={classes.title}>
          {distance.map((groupDistance, index) => (
            <div>
              {groupDistance.length > 0 &&
                `  מדידת סרגל ${index + 1}: ${displaySumDistance(
                  groupDistance
                )}`}
            </div>
          ))}
        </Typography>
        <IconButton
          className={classes.button}
          onClick={handleClear}
          aria-label="delete"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </>
  );
}
