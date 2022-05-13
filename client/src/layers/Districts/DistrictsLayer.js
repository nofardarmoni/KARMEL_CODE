import React from "react";
import { Polygon, Tooltip } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import { makeStyles } from "@material-ui/core";

const POLYLINE_WEIGHT = 5;

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: "rgba(0,0,0,0)",
    border: "0 solid",
    fontFamily: "AlmoniBold",
    boxShadow: "none",
    fontSize: 15,
    color: "white",
    textShadow:
      "rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px",
  },
}));

function DistrictsLayer() {
  const classes = useStyles();
  const { data } = useApiQuery({
    dataPath: "layers/districts",
    label: "מחוזות",
    fetchOnce: true,
  });

  if (!data) return null;
  return (
    <>
      {data.map((district, index) => (
        <Polygon
          key={index}
          positions={district.coordinates}
          color="black"
          weight={POLYLINE_WEIGHT}
          fillOpacity={0}
        >
          <Tooltip
            direction="center"
            className={classes.tooltip}
            offset={[50, 0]}
            permanent
          >
            {district.MahoznameP}
          </Tooltip>
        </Polygon>
      ))}
    </>
  );
}

export default deepCompareMemo(DistrictsLayer);
