import React from "react";
import { ClockCountdown } from "@core";
import { makeStyles } from "@material-ui/core/styles";
import { useEnv } from "@hooks/useEnv";

const WAR_CLOCK_TITLE = "שעון לחימה";

const useStyles = makeStyles(() => ({
  warClockFrame: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 1000,
    backgroundColor: "rgb(25 25 25)",
    borderRadius: "5px",
  },
}));

export default function WarClock() {
  const classes = useStyles();

  const data = useEnv();

  if (!data) return null;

  return (
    <div className={classes.warClockFrame}>
      <ClockCountdown
        zeroTime={new Date(data.warClockStartTime)}
        isNeutral
        title={WAR_CLOCK_TITLE}
      />
    </div>
  );
}
