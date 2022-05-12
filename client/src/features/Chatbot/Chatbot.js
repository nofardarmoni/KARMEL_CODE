import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import { steps, noPhoneSteps, noRoleSteps, shortSteps } from "./steps";
import styles from "./styles.json";
import theme from "./theme.json";
import "./Chatbot.css";

const HEADER_TITLE = "כרמל-בוט";
const PLACEHOLDER = "הקלד הודעה...";
const RECOGNITION_LANG = "he";
const RECOGNITION_PLACEHOLDER = "מאזין...";
const SPEECH_SYNTHESIS = { enable: true, lang: "he" };

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 1000,
    position: "absolute",
    right: 5,
    bottom: 20,
  },
  button: {
    width: 50,
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.25)",
      transition: "0.3s",
    },
  },
  chat: {
    position: "absolute",
    right: 10,
    bottom: 80,
  },
}));

export default function Chatbot() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const name = localStorage.getItem("chatbotName");
  const phone = localStorage.getItem("chatbotPhone");
  const role = localStorage.getItem("chatbotRole");
  const currentSteps = role
    ? shortSteps
    : phone
    ? noRoleSteps
    : name
    ? noPhoneSteps
    : steps;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleClick}>
        <img
          className={classes.button}
          alt="chatbot"
          src="icons/chatbot/chatbot.png"
        />
      </IconButton>
      {open && (
        <div className={classes.chat}>
          <ThemeProvider theme={theme}>
            <ChatBot
              avatarStyle={styles.avatar}
              botAvatar="icons/chatbot/bot-avatar.png"
              steps={currentSteps}
              headerTitle={HEADER_TITLE}
              placeholder={PLACEHOLDER}
              submitButtonStyle={styles.submitButton}
              contentStyle={styles.content}
              bubbleStyle={styles.bubble}
              bubbleOptionStyle={styles.bubbleOption}
              inputStyle={styles.input}
              footerStyle={styles.footer}
              enableSmoothScroll
              recognitionEnable
              recognitionLang={RECOGNITION_LANG}
              recognitionPlaceholder={RECOGNITION_PLACEHOLDER}
              speechSynthesis={SPEECH_SYNTHESIS}
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
