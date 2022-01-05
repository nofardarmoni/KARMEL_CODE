import React, { Fragment, useState } from "react";
import { useMapEvent } from "react-leaflet";
import { Grid, Input, makeStyles, Slider, Typography } from "@material-ui/core";
import { defaultZoom, maxZoom, minZoom } from "@constants";

const useStyles = makeStyles(() => ({
  input: {
    color: "white",
    fontWeight: "bold",
    width: 60,
  },
  zoomTitle: {
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: "normal",
  },
  title: {
    fontFamily: "AlmoniBold",
    fontSize: 17,
    padding: 3,
  },
}));

const getZoomByPercentage = (zoomPercentage) => {
  const zoom = (zoomPercentage * defaultZoom) / 100;

  return zoom;
};

const getZoomPercentage = (zoom) => {
  const zoomPercentage = (zoom * 100) / defaultZoom;

  return zoomPercentage;
};

const displayZoom = (zoom) => {
  const zoomPercentage = getZoomPercentage(zoom);

  if (zoomPercentage !== Math.floor(zoomPercentage)) {
    return `${zoomPercentage.toFixed(1)}%`;
  }

  return `${zoomPercentage}%`;
};

export default function ZoomSettings({ layers, setLayers }) {
  const classes = useStyles();
  const zoomPercentageStep = getZoomPercentage(1);
  const zoomPercentageMinZoom = getZoomPercentage(minZoom);
  const zoomPercentageMaxZoom = getZoomPercentage(maxZoom);
  const map = useMapEvent({
    zoom: () => {
      setCurrentZoom(map.getZoom());
    },
  });
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());

  const handleSliderChange = (layerName) => (event, value) => {
    setLayers((prev) => {
      return {
        ...prev,
        [layerName]: { ...prev[layerName], zoom: value },
      };
    });
  };

  const handleInputChange = (event) => {
    const [layerName, value] = [event.target.name, event.target.value];

    setLayers((prev) => {
      return {
        ...prev,
        [layerName]: {
          ...prev[layerName],
          zoom: Number(getZoomByPercentage(value)),
        },
      };
    });
  };

  const handleBlur = (event) => {
    const [layerName, value] = [event.target.name, event.target.value];
    if (value < getZoomPercentage(minZoom)) {
      setLayers((prev) => {
        return {
          ...prev,
          [layerName]: { ...prev[layerName], zoom: minZoom },
        };
      });
    } else if (value > getZoomPercentage(maxZoom)) {
      setLayers((prev) => {
        return {
          ...prev,
          [layerName]: { ...prev[layerName], zoom: maxZoom },
        };
      });
    }
  };

  return (
    <>
      <Typography className={classes.title}>הגדרות זום</Typography>
      <span className={classes.zoomTitle}>
        זום נוכחי: {displayZoom(currentZoom)}
      </span>
      <span>קבע ערך זום אשר החל ממנו השכבה תוצג</span>
      {Object.keys(layers).map(
        (layerKey) =>
          !isNaN(parseInt(layers[layerKey].zoom)) && (
            <Fragment key={layerKey}>
              <Typography>{layers[layerKey].label}</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <span>
                    %
                    <Input
                      className={classes.input}
                      value={getZoomPercentage(layers[layerKey].zoom)}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: zoomPercentageStep,
                        min: zoomPercentageMinZoom,
                        max: zoomPercentageMaxZoom,
                        type: "number",
                        name: layerKey,
                      }}
                    />
                  </span>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={layers[layerKey].zoom}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={minZoom}
                    max={maxZoom}
                    onChange={handleSliderChange(layerKey)}
                    valueLabelFormat={displayZoom(layers[layerKey].zoom)}
                    name={layerKey}
                  />
                </Grid>
              </Grid>
            </Fragment>
          )
      )}
    </>
  );
}
