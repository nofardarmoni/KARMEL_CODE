import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { eventSortModeState } from "@states/eventState";
import { useRecoilState } from "recoil";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  titleContainer: {
    width: 220,
    height: 50,
    zIndex: 1001,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    top: 22,
    backgroundColor: "rgb(25 25 25)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 15,
    overflow: "hidden",
  },
  title: {
    fontSize: 21,
    fontFamily: "AlmoniBold",
    color: "white",
  },
  progress: {
    width: "110%",
    position: "absolute",
    top: 47,
  },

  greySortButton: {
    color: "grey",
  },

  tootlipTitle: {
    fontSize: 16,
    fontFamily: "AlmoniBold",
  },
}));

export default function OpenEventsTitle({ eventSum, isEarthquake }) {
  const classes = useStyles();
  const [sortMode, setSortMode] = useRecoilState(eventSortModeState);
  const [loading, setLoading] = useState(false);
  const handleSort = () => {
    if (sortMode) {
      setSortMode(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortMode(true);
    }, 3000);
  };

  return (
    <>
      <div className={classes.titleContainer}>
        <div className={classes.title}> {isEarthquake ? "אירוע רעידת אדמה" : "אירועי טילים"} ({eventSum})</div>
        {eventSum > 1 && (
          <Tooltip
            title={
              <span className={classes.tootlipTitle}>
                {sortMode ? "הסר תעדוף" : "תעדוף אירועים"}
              </span>
            }
            arrow={false}
          >
            <IconButton
              color="secondary"
              size="small"
              onClick={handleSort}
              className={!sortMode ? classes.greySortButton : ""}
            >
              <SwapVertIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
        {loading && (
          <LinearProgress color="secondary" className={classes.progress} />
        )}
      </div>
    </>
  );
}
