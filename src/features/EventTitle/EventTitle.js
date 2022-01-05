import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEventState } from "@states/eventState";
import { eventListState } from "@states/eventState";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { ClockCountdown } from "@core";
import { eventTypes } from "@constants";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  eventTitleFrame: {
    display: "flex",
    flexDirection: "column",
    width: "240px",
    zIndex: 1000,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    top: "22px",
  },
  eventTitleContainer: {
    zIndex: 1,
    width: "100%",
    height: "70px",
    backgroundColor: "rgb(25 25 25)",
    borderRadius: "5px",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "AlmoniBold",
  },

  eventTitle: {
    color: "white",
    fontSize: "30px",
    width: "100%",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  eventLabel: {
    fontSize: "15px",
    fontWeight: "normal",
    marginTop: "-10px",
    color: "#ffb500",
    // textShadow: "0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px #F90, 0px -20px 40px #C33",
  },
  closeButton: {
    color: "grey",
    position: "absolute",
    left: 0,
    top: 0,
  },
  countdownContainer: {
    paddingTop: "10px",
    margin: "-4px",
    background: "#191919",
    borderRadius: "5%",
  },
}));

export default function EventTitle() {
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
  const eventList = useRecoilValue(eventListState);
  const title = (() => {
    switch (currentEvent.type) {
      case eventTypes.Drawing.name:
        return "דוח שטח";
      default:
        return `אירוע מס"ל`;
    }
  })();
  const classes = useStyles();

  const updateCurrentEvent = (step) => {
    const currentIndex = eventList.findIndex((e) => e.id === currentEvent.id);
    const updatedIndex =
      (currentIndex + step + eventList.length) % eventList.length;
    setCurrentEvent(eventList[updatedIndex]);
  };

  if (!currentEvent) return null;
  return (
    <div className={classes.eventTitleFrame}>
      <div className={classes.eventTitleContainer}>
        <IconButton
          className={classes.closeButton}
          onClick={() => setCurrentEvent(null)}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <div className={classes.eventTitle}>
          {eventList.length > 1 && (
            <ArrowForwardRoundedIcon
              className="clickable"
              onClick={() => updateCurrentEvent(-1)}
            />
          )}
          <div>
            <span>{title}</span>
            {eventTypes[currentEvent.type].label && (
              <div className={classes.eventLabel}>
                {eventTypes[currentEvent.type].label}
              </div>
            )}
          </div>
          {eventList.length > 1 && (
            <ArrowBackRoundedIcon
              className="clickable"
              onClick={() => updateCurrentEvent(1)}
            />
          )}
        </div>
      </div>
      <div className={classes.countdownContainer}>
        <ClockCountdown
          preTitle={"לפגיעה"}
          title={"מתחילת האירוע"}
          bottomTitle
          minimized
          zeroTime={currentEvent.impactTime}
        />
      </div>
    </div>
  );
}
