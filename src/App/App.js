import React from "react";
import "./App.css";
import {
  Chatbot,
  MissileSubscriber,
  ModuleDisplayer,
  ModuleNavigator,
  ErrorSnackbar,
} from "@features";
import { AlertedAreasSubscriber } from "@features/alerted-areas";
import { useIsFetching } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEnv } from "@hooks/useEnv";

const useStyles = makeStyles(() => ({
  spinner: {
    zIndex: 1000,
    position: "absolute",
    bottom: "30px",
    left: "30px",
    color: "#00ced1",
    opacity: 0.8,
  },
}));

function LoadingIndicator() {
  const classes = useStyles();
  const isFetching = useIsFetching();

  return (
    isFetching && (
      <CircularProgress className={classes.spinner} size={40} thickness={7} />
    )
  );
}

export default function App() {
  // useEnv();

  return (
    <>
      <MissileSubscriber />
      <AlertedAreasSubscriber />

      <ModuleNavigator />
      <ModuleDisplayer />

      <ErrorSnackbar />
      <Chatbot />
      <LoadingIndicator />
    </>
  );
}
