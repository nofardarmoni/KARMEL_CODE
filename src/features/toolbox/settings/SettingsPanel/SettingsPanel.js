import { makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import WidgetsIcon from "@material-ui/icons/Widgets";
import {
  DistanceSettings,
  GeneralSettings,
  ZoomSettings,
} from "@features/toolbox/settings";
import { useRecoilValue } from "recoil";
import { currentModuleState } from "@states/moduleState";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    position: "absolute",
    backgroundColor: "#191919",
    top: 270,
    left: 90,
    borderRadius: 5,
    textAlign: "center",
    color: "white",
    paddingTop: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontWeight: "bold",
  },
  tabs: {
    width: 200,
    marginBottom: 10,
    alignSelf: "center",
  },
  tab: {
    color: "white",
    minWidth: 50,
    marginBottom: -5,
  },
}));

export default function Settings({ layers, setLayers }) {
  const classes = useStyles();
  const [value, setValue] = useState("general");
  const currentModule = useRecoilValue(currentModuleState);

  const tabs = {
    general: {
      icon: <WidgetsIcon />,
      label: "כללי",
      component: <GeneralSettings currentModule={currentModule} />,
    },
    zoom: {
      icon: <ZoomInIcon />,
      label: "זום",
      component: <ZoomSettings currentModule={currentModule} />,
    },
    distance: {
      icon: <SquareFootIcon />,
      label: "מרחק",
      component: <DistanceSettings currentModule={currentModule} />,
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root + " shadow"}>
      <Tabs
        classes={{ root: classes.tabs }}
        centered={true}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {Object.keys(tabs).map((tab) => (
          <Tab
            key={tab}
            classes={{ root: classes.tab }}
            value={tab}
            icon={tabs[tab].icon}
            label={tabs[tab].label}
          />
        ))}
      </Tabs>
      {value === "general" && <GeneralSettings />}
      {value === "zoom" && (
        <ZoomSettings layers={layers} setLayers={setLayers} />
      )}
      {value === "distance" && (
        <DistanceSettings layers={layers} setLayers={setLayers} />
      )}
    </div>
  );
}
