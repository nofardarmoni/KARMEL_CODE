import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { deepCompareMemo } from "@services";
import _ from "lodash";
import { defaultPolicy } from "./defensePolicies";

const TITLE = "בחר שירותים לאזרח";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: "center",
    border: "5px solid black",
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontFamily: "AlmoniBold",
    fontSize: 20,
  },
  navButton: {
    paddingTop: 30,
    backgroundColor: "#191919",
  },
  label: {
    paddingTop: 10,
    width: 90,
    color: "white",
    fontSize: 14,
    fontFamily: "AlmoniBold",
  },
}));

const useIconStyles = makeStyles(() => ({
  defaultButton: {
    height: 50,
    width: 50,
    border: "2px solid #191919",
    borderRadius: "50%",
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.25)",
      transition: "0.3s",
    },
  },
  chosen: {
    border: "2px solid white",
    borderRadius: "50%",
    transform: "scale(1.45)",
    "&:hover": {
      transform: "scale(1.45)",
    },
  },
  grayIcon: {
    filter: "contrast(200%) grayscale(100%) brightness(80%)",
  },
}));

function NavIcon({ label, selected, icon, disabled }) {
  const classes = useIconStyles();

  return (
    <img
      className={`
          ${classes.defaultButton}
          ${selected[label] && classes.chosen}
          ${disabled && classes.grayIcon}`}
      alt={label}
      src={icon}
    />
  );
}

function LayersSelector({
  layers,
  selectedLayers,
  setSelectedLayers,
  setDefensePolicySelectorFlag,
  setCurrentDefensePolicy,
}) {
  const classes = useStyles();

  const updateSelectedLayers = (_event, newValue) => {
    const selectedLayersCopy = _.cloneDeep(selectedLayers);
    const prevSelectedLayersLength = Object.keys(selectedLayersCopy).length;

    if (selectedLayersCopy[newValue]) {
      delete selectedLayersCopy[newValue];
    } else {
      selectedLayersCopy[newValue] = layers[newValue];
    }

    const selectedLayersLength = Object.keys(selectedLayersCopy).length;

    if (prevSelectedLayersLength === 0) {
      setDefensePolicySelectorFlag(true);
    }
    if (selectedLayersLength === 0) {
      setCurrentDefensePolicy(defaultPolicy);
      setDefensePolicySelectorFlag(false);
    }

    setSelectedLayers(selectedLayersCopy);
  };

  return (
    <div className={classes.root}>
      <span className={classes.title}>{TITLE}</span>
      <BottomNavigation
        onChange={updateSelectedLayers}
        className={classes.navButton}
        showLabels
      >
        {Object.keys(layers).map((layer) => (
          <BottomNavigationAction
            key={layer}
            classes={{ label: classes.label }}
            value={layer}
            disabled={layers[layer].isDisabled}
            icon={
              <NavIcon
                label={layer}
                selected={selectedLayers}
                icon={layers[layer].icon}
                disabled={layers[layer].isDisabled}
              />
            }
            disableTouchRipple
            label={layers[layer].label}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default deepCompareMemo(LayersSelector);
