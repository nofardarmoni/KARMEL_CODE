import {
  Button,
  makeStyles,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSpeedFlyState, mapTypeState } from "@states/mapState";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 5,
    paddingBottom: 20,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontFamily: "AlmoniBold",
    fontSize: 17,
    padding: 3,
  },
  animation: {
    fontSize: 14,
  },
}));

const mapButtonStyle = makeStyles(() => ({
  root: {
    borderRadius: "20%",
    height: 75,
    width: 75,
  },
}));

const switchStyle = makeStyles(() => ({
  track: {
    backgroundColor: "white",
  },
}));

export default function GeneralSettings() {
  const classes = useStyles();
  const mapButtonClass = mapButtonStyle();
  const switchClass = switchStyle();
  const setMapType = useSetRecoilState(mapTypeState);
  const [minimapType, setMinimapType] = useState("street");
  const [isSpeedFly, setIsSpeedFly] = useRecoilState(isSpeedFlyState);
  const iconsUrl = "icons/maps/";

  const minimaps = {
    street: {
      label: "מפה רגילה",
      src: `${iconsUrl}map.png`,
    },
    satellite: {
      label: "מפה לווינית",
      src: `${iconsUrl}satellite.png`,
    },
  };

  const handleClick = () => {
    switch (minimapType) {
      case "satellite":
        setMapType("satellite");
        setMinimapType("street");
        break;
      case "street":
        setMapType("street");
        setMinimapType("satellite");
        break;
      default:
        break;
    }
  };

  const handleChange = () => {
    setIsSpeedFly(!isSpeedFly);
  };

  return (
    <>
      <span className={classes.title}>בחירת סוג מפה</span>
      <div className={classes.root}>
        <Button classes={mapButtonClass} onClick={handleClick}>
          <img
            className={mapButtonClass.root}
            alt={minimaps[minimapType].label}
            src={minimaps[minimapType].src}
          />
        </Button>
      </div>

      <>
        <span className={classes.title}>הגדרת מעבר בין אירועים</span>
        <FormControlLabel
          classes={{ root: classes.root }}
          control={
            <Switch
              classes={{ track: switchClass.track }}
              checked={isSpeedFly}
              onChange={handleChange}
              color="primary"
            />
          }
          label={<span className={classes.animation}>מעבר מהיר</span>}
        />
      </>
    </>
  );
}
