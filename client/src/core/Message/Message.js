import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useRecoilState } from "recoil";
import { snackbarFlagState } from "@states/snackbarState";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const MESSAGE_DISPLAY_TIME = 5000;

const snackbarStyles = makeStyles(() => ({
  root: {
    direction: "ltr",
  },
}));

export default function Message({ message, type }) {
  const snackbarClass = snackbarStyles();
  const [open, setOpen] = useRecoilState(snackbarFlagState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    type && (
      <Snackbar
        classes={snackbarClass}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={MESSAGE_DISPLAY_TIME}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    )
  );
}
