import React, { useState } from "react";
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
import { Earthquake } from "@modules";
import { IconButton } from "@material-ui/core";
import {
  FormatListNumberedRtl,
  InsertDriveFile,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  OndemandVideo,
  PlusOne,
} from "@material-ui/icons";
import { BIButton } from "@features/bi";
// import { useEnv } from "@hooks/useEnv";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [isFileClicked, setIsFileClicked] = useState(false);
  const [isLegendClicked, setIsLegendClicked] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <>
      <MissileSubscriber />
      <AlertedAreasSubscriber />

      <Earthquake />

      <ErrorSnackbar />
      <Chatbot />
      <LoadingIndicator />

      <BIButton
        title="מקרא"
        top={80}
        left={1850}
        onClick={() => setIsLegendClicked(!isLegendClicked)}
        icon={<FormatListNumberedRtl fontSize="large" color="white" />}
      />

      {isLegendClicked && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            position: "absolute",
            backgroundColor: "#191919",
            top: 120,
            right: 80,
            width: 200,
            borderRadius: 5,
            color: "white",
            paddingTop: 5,
            paddingRight: 10,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: "bold" }}>מקרא</span>
          <div>
            <img
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-green.png"
            />
            100% תפקוד
          </div>
          <div>
            <img
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-yellow.png"
            />
            92% - 77% תפקוד
          </div>
          <div>
            <img
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-red.png"
            />
            50% - 0% תפקוד
          </div>
          <div>
            <img
              height={30}
              width={30}
              src="icons/layers/waters/blue-water-drop.png"
            />
            100% תפקוד
          </div>
          <div>
            <img
              height={30}
              width={30}
              src="icons/layers/waters/orange-water-drop.png"
            />
            92% - 77% תפקוד
          </div>
          <div>
            <img
              height={30}
              width={30}
              src="icons/layers/waters/red-water-drop.png"
            />
            50% - 0% תפקוד
          </div>
        </div>
      )}

      <BIButton
        title="המלצות ותחומי אחריות"
        top={970}
        left={150}
        onClick={() => setIsFileClicked(!isFileClicked)}
        icon={<InsertDriveFile fontSize="large" color="white" />}
      />

      {isFileClicked && (
        <>
          <BIButton
            title="קדימה"
            top={970}
            left={950}
            onClick={() => {
              if (pageNumber === numPages) setPageNumber(numPages);
              else setPageNumber(pageNumber + 1);
            }}
            icon={<KeyboardArrowRight fontSize="large" color="white" />}
          />
          <BIButton
            title="אחורה"
            top={970}
            left={300}
            onClick={() => {
              if (pageNumber === 1) setPageNumber(1);
              else setPageNumber(pageNumber - 1);
            }}
            icon={<KeyboardArrowLeft fontSize="large" color="white" />}
          />
          <div
            style={{
              zIndex: 999,
              position: "absolute",
              left: 300,
              bottom: 20,
            }}
          >
            <Document file="pdfFile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page height={1000} pageNumber={pageNumber} />
            </Document>
          </div>
        </>
      )}

      <BIButton
        title="תחומי אחריות"
        top={970}
        left={60}
        onClick={() => setIsVideoClicked(!isVideoClicked)}
        icon={<OndemandVideo fontSize="large" color="white" />}
      />
      {isVideoClicked && (
        <video
          controls={true}
          style={{
            zIndex: 1000,
            position: "absolute",
            left: 100,
            bottom: 100,
            height: 500,
          }}
          loop
          src="Final_projact.mp4"
          type="video/mp4"
        />
      )}
    </>
  );
}
