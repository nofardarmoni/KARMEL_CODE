import React from "react";
import { errorMessageState } from "@states/errorMessageState";
import { useRecoilState } from "recoil";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const ERROR_DISPLAY_TIME = 5000;

const snackbarStyles = makeStyles(() => ({
  root: {
    direction: "ltr",
  },
}));

export default function ErrorSnackbar() {
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const snackbarClass = snackbarStyles();
  const handleClose = () => setErrorMessage(null);
  return (
    <Snackbar
      classes={snackbarClass}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!errorMessage}
      autoHideDuration={ERROR_DISPLAY_TIME}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} variant="filled" severity={"error"}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
