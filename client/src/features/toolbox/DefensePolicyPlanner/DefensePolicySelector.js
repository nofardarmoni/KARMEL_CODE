import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SecurityIcon from "@material-ui/icons/Security";
import { deepCompareMemo } from "@services";

const TITLE = "בחר מדיניות התגוננות";

const useStyles = makeStyles({
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
    backgroundColor: "#191919",
    paddingTop: 20,
  },
  label: {
    paddingTop: 10,
    color: "white",
    fontSize: 14,
    fontFamily: "AlmoniBold",
  },
});

const useIconStyles = makeStyles(() => ({
  defaultButton: {
    fontSize: 35,
    color: ({ color }) => color,
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.25)",
      transition: "0.3s",
    },
  },
  chosen: {
    backgroundColor: "#404040",
    borderRadius: 10,
    transform: "scale(1.45)",
    "&:hover": {
      transform: "scale(1.45)",
    },
  },
}));

function NavIcon({ label, color, current }) {
  const classes = useIconStyles({ color });

  return (
    <SecurityIcon
      className={`
           ${classes.defaultButton}
           ${label === current && classes.chosen}`}
    />
  );
}

function DefensePolicySelector({
  defensePolicies,
  currentDefensePolicy,
  setCurrentDefensePolicy,
}) {
  const classes = useStyles();

  const switchPolicy = (_, newValue) => {
    if (currentDefensePolicy !== newValue) {
      setCurrentDefensePolicy(newValue);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <span className={classes.title}>{TITLE}</span>
        <BottomNavigation
          value={currentDefensePolicy}
          onChange={switchPolicy}
          className={classes.navButton}
          showLabels
        >
          {Object.keys(defensePolicies).map(
            (policy) =>
              !defensePolicies[policy].isHidden && (
                <BottomNavigationAction
                  key={policy}
                  classes={{ label: classes.label }}
                  value={policy}
                  icon={
                    <NavIcon
                      label={policy}
                      color={defensePolicies[policy].color}
                      current={currentDefensePolicy}
                    />
                  }
                  disableTouchRipple
                  label={defensePolicies[policy].label}
                />
              )
          )}
        </BottomNavigation>
      </div>
    </>
  );
}

export default deepCompareMemo(DefensePolicySelector);
