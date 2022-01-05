import React from "react";
import { useMap } from "react-leaflet";
import { IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward, Close } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    zIndex: 1000,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    top: 20,
    backgroundColor: "#191919",
    borderRadius: "5px",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    color: "white",
    fontFamily: "AlmoniBold",
  },
  title: {
    paddingTop: 15,
    fontSize: 14,
  },
  polygonTitle: {
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: 0,
    color: "grey",
  },
  arrow: {
    color: "grey",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function DefensePolicyTitle({
  currentPolygon,
  polygonOptions,
  polygonsLayersLength,
  setDefensePolicyFlag,
  setPolygonsLayerId,
}) {
  const classes = useStyles();
  const map = useMap();

  const handleClose = () => {
    setDefensePolicyFlag(false);
    map.dragging.enable();
  };

  const handleArrowClick = (value) => {
    setPolygonsLayerId(
      (prev) => (prev + value + polygonsLayersLength) % polygonsLayersLength
    );
  };

  return (
    <div className={`${classes.root} shadow`}>
      <IconButton
        className={classes.closeButton}
        onClick={handleClose}
        size="small"
      >
        <Close fontSize="small" />
      </IconButton>
      <div className={classes.titleContainer}>
        {!currentPolygon && (
          <IconButton
            className={classes.arrow}
            onClick={() => handleArrowClick(-1)}
          >
            <ArrowForward />
          </IconButton>
        )}
        <div>
          <div className={classes.title}>כלי תכנון מדיניות התגוננות</div>
          <div className={classes.polygonTitle}>
            {currentPolygon?.[polygonOptions.nameField] ?? polygonOptions.title}
          </div>
        </div>
        {!currentPolygon && (
          <IconButton
            className={classes.arrow}
            onClick={() => handleArrowClick(1)}
          >
            <ArrowBack />
          </IconButton>
        )}
      </div>
    </div>
  );
}
