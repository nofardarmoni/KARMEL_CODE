import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloseIcon from "@material-ui/icons/Close";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";

const useStyles = makeStyles(() => ({
  speedDial: {
    position: "absolute",
    zIndex: 1000,
    left: 20,
    top: 20,
  },
  speedDialFab: {
    "&.MuiFab-primary": {
      backgroundColor: "#191919",
    },
  },
}));

const tooltipStyle = makeStyles(() => ({
  tooltip: {
    fontSize: 14,
  },
}));

export default function SimulatorToolBox() {
  const classes = useStyles();
  const tooltipClass = tooltipStyle();
  const [open, setOpen] = useState(false); // todo: can be a better state machine
  const [simulateMissileFlag, setSimulateMissileFlag] = useState(false);
  const [simulateFireFlag, setSimulateFireFlag] = useState(false);
  const [simulateEarthquakeFlag, setSimulateEarthquakeFlag] = useState(false);

  const toggleFeature = (setFeature) => {
    setFeature((prev) => !prev);
  };

  const closeFeature = (feature, setFeature) => {
    if (feature) {
      setFeature(false);
    }
  };

  const actions = {
    missiles: {
      icon: simulateMissileFlag ? (
        <CloseIcon />
      ) : (
        <img
          src="icons/modules/simulator/missile.png"
          width="25"
          color="gray"
          alt="missle img"
        />
      ),
      name: "אירועי טילים",
      handler: () => toggleFeature(setSimulateMissileFlag),
    },
    fire: {
      icon: simulateFireFlag ? <CloseIcon /> : <WhatshotIcon />,
      name: "שריפה",
      handler: () => toggleFeature(setSimulateFireFlag),
    },
    earthQuake: {
      icon: simulateFireFlag ? <CloseIcon /> : <BrokenImageIcon />,
      name: "רעידת אדמה",
      handler: () => toggleFeature(setSimulateEarthquakeFlag),
    },
  };

  const handleClose = () => {
    setOpen(false);
    closeFeature(simulateMissileFlag, setSimulateMissileFlag);
    closeFeature(simulateFireFlag, setSimulateFireFlag);
    closeFeature(simulateEarthquakeFlag, setSimulateEarthquakeFlag);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        open={open}
        direction={"down"}
        FabProps={{
          className: classes.speedDialFab,
          onClick: () => (open ? handleClose() : setOpen(true)),
        }}
      >
        {Object.keys(actions).map((action) => (
          <SpeedDialAction
            key={action}
            icon={actions[action].icon}
            tooltipTitle={actions[action].name}
            TooltipClasses={tooltipClass}
            tooltipPlacement={"bottom"}
            arrow={true}
            onClick={actions[action].handler}
          />
        ))}
      </SpeedDial>
    </>
  );
}
