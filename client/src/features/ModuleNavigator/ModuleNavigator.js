import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { currentModuleState } from "@states/moduleState";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Tooltip from "@material-ui/core/Tooltip";

const NAV_WIDTH_PER_MODULE = 80;

const useIconStyles = makeStyles(() => ({
  defaultButton: {
    height: 50,
    width: 50,
    filter: "drop-shadow(0 0 10px black)",
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.25)",
      transition: "0.3s",
    },
  },
  chosen: {
    transform: "scale(1.45)",
    "&:hover": {
      transform: "scale(1.45)",
    },
  },
}));

const useStyles = makeStyles({
  navButton: {
    zIndex: 1000,
    position: "absolute",
    width: ({ numberOfModules }) => NAV_WIDTH_PER_MODULE * numberOfModules,
    height: 90,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    bottom: 20,
    borderRadius: "20px",
    right: 0,
    left: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const iconsUrl = "icons/modules/";

const modules = {
  Medicine: {
    label: "רפואה",
    icon: `${iconsUrl}medicine/medicine.png`,
  },
  Tikshuv: {
    label: "תקשוב",
    icon: `${iconsUrl}tikshuv/tikshuv.png`,
  },
  HFC: {
    label: 'אג"ם',
    icon: `${iconsUrl}home-front-command/home-front-command.png`,
  },
  Population: {
    label: "אוכלוסייה",
    icon: `${iconsUrl}population/population.png`,
  },
  Earthquake: {
    label: "רעידת אדמה",
    icon: `${iconsUrl}earthquake/earthquake.png`,
  },
  Atal: {
    label: 'אט"ל',
    icon: `${iconsUrl}/atal/atal.png`,
  },
  Simulator: {
    label: "סימולטור",
    icon: `${iconsUrl}/simulator/simulator.png`,
  },
};

const ModuleTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  arrow: {
    color: "rgba(0, 0, 0, 0.8)",
  },
}))(Tooltip);

function NavIcon(props) {
  const classes = useIconStyles();

  return (
    <img
      className={`
          ${classes.defaultButton}
          ${props.label === props.current && classes.chosen}`}
      alt={props.label}
      src={props.icon}
    />
  );
}

export default function ModuleNavigator() {
  const numberOfModules = Object.keys(modules).length;
  const classes = useStyles({ numberOfModules });
  const [currentModule, setCurrentModule] = useRecoilState(currentModuleState);

  const switchModule = (_, newValue) => {
    if (currentModule !== newValue) {
      setCurrentModule(newValue);
    }
  };

  return (
    <BottomNavigation
      value={currentModule}
      onChange={switchModule}
      className={classes.navButton}
    >
      {Object.keys(modules).map((key) => (
        <ModuleTooltip
          key={key}
          title={modules[key].label}
          aria-label={key}
          arrow
        >
          <BottomNavigationAction
            value={key}
            icon={
              <NavIcon
                label={key}
                current={currentModule}
                icon={modules[key].icon}
              />
            }
            disableTouchRipple
          />
        </ModuleTooltip>
      ))}
    </BottomNavigation>
  );
}
