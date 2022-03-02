import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMap } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import LayersIcon from "@material-ui/icons/Layers";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import NavigationIcon from "@material-ui/icons/Navigation";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";
import BuildIcon from "@material-ui/icons/Build";
import {
  DistanceMeasurement,
  DefensePolicyPlanner,
  LayersControl,
  PolygonDrawer,
  SituationReport,
  SLATable,
  NavigationTool,
} from "@features/toolbox";
import { SettingsPanel } from "@features/toolbox/settings";
import { currentEventState } from "@states/eventState";
import { currentModuleState } from "@states/moduleState";
import { slaTableFlagState } from "@states/slaTableState";
import { MovilimGraph } from "@features/graphs";
import { distanceMeasurementFlagState } from "@states/toolboxState";

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

export default function Toolbox({ layers, setLayers, defensePolicyOptions }) {
  const classes = useStyles();
  const tooltipClass = tooltipStyle();
  const [open, setOpen] = useState(false); // todo: can be a better state machine
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [layersControlFlag, setLayersControlFlag] = useState(false);
  const [distanceMeasurementFlag, setDistanceMeasurementFlag] = useRecoilState(
    distanceMeasurementFlagState
  );
  const [navigationFlag, setNavigationFlag] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const { defensePolicyFlag, setDefensePolicyFlag } =
    defensePolicyOptions ?? {};
  const [slaTableFlag, setSlaTableFlag] = useRecoilState(slaTableFlagState);
  const setCurrentEvent = useSetRecoilState(currentEventState);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);
  const currentModule = useRecoilValue(currentModuleState);
  const [situationReportFlag, setSituationReportFlag] = useState(false);
  const [movilimGraphFlag, setMovilimGraphFlag] = useState(false);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const map = useMap();

  const toggleFeature = (setFeature) => {
    setFeature((prev) => !prev);
  };

  const closeFeature = (feature, setFeature) => {
    if (feature) {
      setFeature(false);
    }
  };

  const closeDrawMode = () => {
    setDrawMode(false);
    // if (isPolygonClosed) { // todo: check why isPolygonclosed is true although it is closed when switch module
    setCurrentEvent(null); // todo: remove from this component
    setIsPolygonClosed(false);
    // }
  };

  const actions = {
    layerOrganizer: {
      icon: <LayersIcon />,
      name: "סדרן שכבות",
      handler: () => {
        toggleFeature(setLayersControlFlag);
        closeFeature(settingsFlag, setSettingsFlag);
        closeFeature(defensePolicyFlag, setDefensePolicyFlag);
      },
      modules: [
        "HFC",
        "Medicine",
        "Population",
        "Tikshuv",
        "Earthquake",
        "Atal",
      ],
    },
    polygonDrawer: {
      icon: drawMode ? <CloseIcon /> : <EditIcon />,
      name: "ציור פוליגון",
      handler: () => {
        if (drawMode) {
          closeDrawMode();
        } else {
          setDrawMode(true);
          closeFeature(distanceMeasurementFlag, setDistanceMeasurementFlag);
          closeFeature(navigationFlag, setNavigationFlag);
        }
      },
      modules: ["HFC", "Medicine", "Tikshuv", "Atal"],
    },
    defensePolicyPlanner: {
      icon: defensePolicyFlag ? <CloseIcon /> : <BuildIcon />,
      name: "תכנון מדיניות התגוננות",
      handler: () => {
        toggleFeature(setDefensePolicyFlag);
        closeFeature(layersControlFlag, setLayersControlFlag);
        closeFeature(settingsFlag, setSettingsFlag);
      },
      modules: ["Population", "Medicine"],
    },
    slaTableEditor: {
      icon: <BuildIcon />,
      name: "תכנון טבלת SLA",
      handler: () => {
        toggleFeature(setSlaTableFlag);
        closeFeature(layersControlFlag, setLayersControlFlag);
        closeFeature(settingsFlag, setSettingsFlag);
      },
      modules: ["Tikshuv"],
    },
    distanceMeasurement: {
      icon: distanceMeasurementFlag ? <CloseIcon /> : <SquareFootIcon />,
      name: distanceMeasurementFlag ? "סגור מדידת מרחק" : "מדידת מרחק",
      handler: () => {
        toggleFeature(setDistanceMeasurementFlag);
        closeDrawMode();
        closeFeature(navigationFlag, setNavigationFlag);
      },
      modules: [
        "HFC",
        "Medicine",
        "Population",
        "Tikshuv",
        "Earthquake",
        "Atal",
      ],
    },
    navigation: {
      icon: navigationFlag ? <CloseIcon /> : <NavigationIcon />,
      name: navigationFlag ? "סגור ניווט" : "ניווט",
      handler: () => {
        toggleFeature(setNavigationFlag);
        closeDrawMode();
        closeFeature(distanceMeasurementFlag, setDistanceMeasurementFlag);
      },
      modules: [
        "HFC",
        "Medicine",
        "Population",
        "Tikshuv",
        "Earthquake",
        "Atal",
      ],
    },
    authoritiesReport: {
      icon: <AssignmentIcon />,
      name: "דוח תמונת מצב",
      modules: ["HFC"],
      handler: () => toggleFeature(setSituationReportFlag),
    },
    movilimGraph: {
      icon: <AssignmentIcon />,
      name: "גרפי מובילים",
      handler: () => {
        toggleFeature(setMovilimGraphFlag);
      },
      modules: ["Atal"],
    },
    settings: {
      icon: <SettingsIcon />,
      name: "הגדרות",
      handler: () => {
        toggleFeature(setSettingsFlag);
        closeFeature(layersControlFlag, setLayersControlFlag);
      },
      modules: [
        "HFC",
        "Medicine",
        "Population",
        "Tikshuv",
        "Earthquake",
        "Atal",
      ],
    },
  };

  const handleClose = () => {
    setOpen(false);
    closeFeature(layersControlFlag, setLayersControlFlag);
    closeDrawMode();
    closeFeature(defensePolicyFlag, setDefensePolicyFlag);
    closeFeature(slaTableFlag, setSlaTableFlag);
    closeFeature(distanceMeasurementFlag, setDistanceMeasurementFlag);
    closeFeature(navigationFlag, setNavigationFlag);
    closeFeature(situationReportFlag, setSituationReportFlag);
    closeFeature(settingsFlag, setSettingsFlag);
    closeFeature(movilimGraphFlag, setMovilimGraphFlag);
  };

  const handleMouseEnter = () => {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    map.dragging.enable();
    map.doubleClickZoom.enable();
    setIsMouseEntered(false);
  };

  useEffect(() => {
    return () => {
      handleClose();
    };

    // temp fix - because this should be refactored:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   return () => {
  //     handleClose();
  //   };
  // }, []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        {Object.keys(actions).map(
          (action) =>
            actions[action].modules.includes(currentModule) && (
              <SpeedDialAction
                key={action}
                icon={actions[action].icon}
                tooltipTitle={actions[action].name}
                TooltipClasses={tooltipClass}
                tooltipPlacement={"bottom"}
                arrow={true}
                onClick={actions[action].handler}
              />
            )
        )}
      </SpeedDial>
      {layersControlFlag && (
        <LayersControl layers={layers} setLayers={setLayers} />
      )}
      {drawMode && (
        <PolygonDrawer
          isPolygonClosed={isPolygonClosed}
          setIsPolygonClosed={setIsPolygonClosed}
          isClickDisabled={isMouseEntered}
        />
      )}
      {distanceMeasurementFlag && (
        <DistanceMeasurement isClickDisabled={isMouseEntered} />
      )}
      {navigationFlag && <NavigationTool isClickDisabled={isMouseEntered} />}
      {settingsFlag && <SettingsPanel layers={layers} setLayers={setLayers} />}
      {defensePolicyFlag && (
        <DefensePolicyPlanner
          defensePolicyOptions={defensePolicyOptions}
          setDefensePolicyFlag={setDefensePolicyFlag}
        />
      )}
      {currentModule === "Tikshuv" && slaTableFlag && <SLATable />}
      {situationReportFlag && <SituationReport />}
      {movilimGraphFlag && <MovilimGraph />}
    </div>
  );
}
