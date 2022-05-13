import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { makeStyles } from "@material-ui/core/styles";

const MINIMIZE_RATIO = 0.7;

const getClockTextColor = (completed, isNeutral) => {
  if (isNeutral) {
    return "#88FFFF";
  }

  return completed ? "lemonchiffon" : "red";
};

const minimizeIf = (condition, value) => {
  return condition ? value * MINIMIZE_RATIO : value;
};

const useStyles = makeStyles(() => ({
  countdownFrame: {
    width: ({ digitPairs, minimized }) =>
      digitPairs * minimizeIf(minimized, 50),
    marginLeft: "8px",
    marginRight: "8px",
    paddingLeft: "8px",
    paddingRight: "8px",
    textAlign: "center",
    borderRadius: "5px",
  },
  countdownTitle: {
    fontSize: ({ minimized }) => minimizeIf(minimized, 25),
    color: "#DDDDDD",
    fontFamily: "AlmoniBold",
    fontWeight: "bold",
    marginBottom: ({ minimized, bottomTitle }) =>
      !bottomTitle ? minimizeIf(minimized, -12) : 0,
    marginTop: ({ minimized, bottomTitle }) =>
      bottomTitle ? minimizeIf(minimized, -12) : 0,
  },
  countdown: {
    fontSize: ({ minimized }) => minimizeIf(minimized, 30),
    fontFamily: "Aldrich",
    color: ({ completed, isNeutral }) =>
      getClockTextColor(completed, isNeutral),
    fontWeight: "bold",
  },
}));

function CountdownRenderer({
  days,
  hours,
  minutes,
  seconds,
  completed,
  props,
}) {
  const classes = useStyles({
    digitPairs: !!days + 3,
    completed,
    minimized: props.minimized,
    isNeutral: props.isNeutral,
    bottomTitle: props.bottomTitle,
  });

  return (
    <div className={classes.countdownFrame + " shadow"}>
      {props.title && !props.bottomTitle && (
        <div className={classes.countdownTitle}>
          {!props.isNeutral && !completed ? props.preTitle : props.title}
        </div>
      )}
      <span className={classes.countdown}>
        {days ? days + ":" : ""}
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
      {props.title && props.bottomTitle && (
        <div className={classes.countdownTitle}>
          {!props.isNeutral && !completed ? props.preTitle : props.title}
        </div>
      )}
    </div>
  );
}

export default function ClockCountdown(props) {
  if (!props.zeroTime) return null;
  return (
    <Countdown
      date={props.zeroTime}
      autoStart
      precision={3}
      intervalDelay={0}
      overtime
      {...props}
      renderer={(props) => <CountdownRenderer {...props} />}
    />
  );
}
