import React, { Fragment, useEffect, useState } from "react";
import { Grid, Input, makeStyles, Slider, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    color: "white",
    fontWeight: "bold",
    width: 50,
  },
  title: {
    fontFamily: "AlmoniBold",
    fontSize: 17,
    padding: 3,
  },
}));

export default function DistanceSettings({ layers, setLayers }) {
  const classes = useStyles();
  const [layersCopy, setLayersCopy] = useState(layers);

  const handleSliderChange = (layerName) => (event, value) => {
    setLayersCopy((prev) => {
      return {
        ...prev,
        [layerName]: { ...prev[layerName], distance: value },
      };
    });
  };

  const handleSliderChangeCommitted = (layerName) => (event, value) => {
    setLayers((prev) => {
      return {
        ...prev,
        [layerName]: { ...prev[layerName], distance: value },
      };
    });
  };

  const handleInputChange = (event) => {
    const [layerName, value] = [event.target.name, event.target.value];

    setLayers((prev) => {
      return {
        ...prev,
        [layerName]: { ...prev[layerName], distance: Number(value) },
      };
    });
  };

  const handleBlur = (event) => {
    const [layerName, value] = [event.target.name, event.target.value];
    if (value < 0) {
      setLayers((prev) => {
        return {
          ...prev,
          [layerName]: { ...prev[layerName], distance: 0 },
        };
      });
    } else if (value > 10) {
      setLayers((prev) => {
        return {
          ...prev,
          [layerName]: { ...prev[layerName], distance: 10 },
        };
      });
    }
  };

  useEffect(() => setLayersCopy(layers), [layers]);

  return (
    <>
      <span className={classes.title}> הגדרות מרחק מפוליגון (ק"מ)</span>
      {Object.keys(layersCopy).map(
        (layerKey) =>
          !isNaN(parseInt(layers[layerKey].distance)) && (
            <Fragment key={layerKey}>
              <Typography>{layers[layerKey].label}</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Input
                    className={classes.input}
                    value={layers[layerKey].distance}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 0.5,
                      min: 0,
                      max: 10,
                      type: "number",
                      name: layerKey,
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={layersCopy[layerKey].distance}
                    valueLabelFormat={layersCopy[layerKey].distance.toFixed(1)}
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks
                    min={0}
                    max={10}
                    onChange={handleSliderChange(layerKey)}
                    onChangeCommitted={handleSliderChangeCommitted(layerKey)}
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
