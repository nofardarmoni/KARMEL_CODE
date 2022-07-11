import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  LayerDisplayer,
  Map,
  SearchGeocoder,
  EventTitle,
  OpenEventsTitle,
} from "@features";

import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";
import { currentEventState, eventListState } from "@states/eventState";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";
import { Button, makeStyles, Tooltip } from "@material-ui/core";
import { BIButton, BIPanel } from "@features/bi";
import {
  DistributionStationsGraph,
  ElectricBarGraph,
  ElectricGraph,
  HospitalsGraph,
  WaterBarGraph,
  WaterDistributionGraph,
  WaterGraph,
  ElectricBarGraphRT,
  GeneralGraph,
} from "@features/graphs";
import {
  FormatListNumberedRtl,
  InsertDriveFile,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  OndemandVideo,
  ShowChart,
} from "@material-ui/icons";
import { Document } from "react-pdf";
import { Page, pdfjs } from "react-pdf";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BI_PANEL_MIN_WIDTH = 450;
const BI_PANEL_MIN_HEIGHT = 200;

const useStyles = makeStyles(() => ({
  speedDial: {
    position: "absolute",
    zIndex: 1000,
    left: 100,
    top: 20,
  },
  speedDialFab: {
    "&.MuiFab-primary": {
      backgroundColor: "#191919",
    },
    "&.MuiSpeedDialAction-fab": {
      backgroundColor: "#191919",
    },
  },
  tooltip: {
    fontSize: 14,
  },
}));

function BI() {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // todo: can be a better state machine
  const [isWaterBIPanelOpen, setIsWaterBIPanelOpen] = useState(false);
  const [isElectricBIPanelOpen, setIsElectricBIPanelOpen] = useState(false);
  const [isGeneralBIPanelOpen, setIsGeneralBIPanelOpen] = useState(false);

  const actions = {
    water: {
      icon: (
        <img
          alt=""
          height={40}
          width={30}
          src="icons/layers/waters/blue-water-drop.png"
        />
      ),
      name: "דשבורד משאבי מים",
      handler: () => {
        setIsWaterBIPanelOpen(!isWaterBIPanelOpen);
      },
    },
    electric: {
      icon: (
        <img
          alt=""
          height={30}
          width={30}
          src="icons/layers/Electric/lightning-green.png"
        />
      ),
      name: "דשבורד תחנות כוח",
      handler: () => {
        setIsElectricBIPanelOpen(!isElectricBIPanelOpen);
      },
    },
    general: {
      icon: <ShowChart />,
      name: "דשבורד נתונים - אוכלוסיה",
      handler: () => {
        setIsGeneralBIPanelOpen(!isGeneralBIPanelOpen);
      },
    },
  };

  const handleClose = () => {
    setOpen(false);
    setIsWaterBIPanelOpen(false);
    setIsElectricBIPanelOpen(false);
    setIsGeneralBIPanelOpen(false);
  };


  return (
    <>
      <Tooltip title="דשבורדים">
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          icon={<ShowChart />}
          open={open}
          direction={"down"}
          FabProps={{
            className: classes.speedDialFab,
            onClick: () => (open ? handleClose() : setOpen(true)),
          }}
        >
          {Object.keys(actions).map((action) => (
            <SpeedDialAction
              key={action}
              icon={actions[action].icon}
              tooltipTitle={actions[action].name}
              TooltipClasses={{ tooltip: classes.tooltip }}
              tooltipPlacement={"bottom"}
              arrow={true}
              onClick={actions[action].handler}
            />
          ))}
        </SpeedDial>
      </Tooltip>
      <>
        <BIPanel
          isOpen={isWaterBIPanelOpen}
          sizePerColumn={BI_PANEL_MIN_WIDTH}
          sizePerRow={BI_PANEL_MIN_HEIGHT}
        >
          <WaterBarGraph />
          <WaterGraph />
          <DistributionStationsGraph />
          <WaterDistributionGraph />
        </BIPanel>
        <BIPanel
          isOpen={isElectricBIPanelOpen}
          sizePerColumn={BI_PANEL_MIN_WIDTH}
          sizePerRow={BI_PANEL_MIN_HEIGHT}
          graphsPerRow={3}
        >
          <ElectricBarGraph />
          <ElectricGraph />
          <ElectricBarGraphRT />
        </BIPanel>
        <BIPanel
          isOpen={isGeneralBIPanelOpen}
          sizePerColumn={BI_PANEL_MIN_WIDTH}
          sizePerRow={BI_PANEL_MIN_HEIGHT}
        >
          <GeneralGraph />
        </BIPanel>
      </>
    </>
  );
}

function MapChildren({ layers, setLayers }) {
  const [showMagnitodaInput, setShowMagnitodaInput] = useState(false);
  const [magnitode, setMagnitode] = useState(0);
  const [newEarthquakeState, setNewEarthquakeState] = useRecoilState(
    earthquakeState
  );
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );
  const predictValue = useRecoilValue(earthquakeState);
  const [whiteBorderRealTimeBtn, setWhiteBorderRealTimeBtn] = useState("white");
  const [whiteBorderPredictBtn, setWhiteBorderPredictBtn] = useState("black");

  const handlePredictionOnClick = (checkMagnitode = true) => {
    if (checkMagnitode && (magnitode < 4.5 || magnitode > 10)) {
      alert("יש להכניס מגניטודה בין 4.5-10");
      setMagnitode(0);
    }

    setShowMagnitodaInput(true);

    if (newEarthquakeState === "realtime") {
      setWhiteBorderPredictBtn("white");
      setWhiteBorderRealTimeBtn("black");
      setNewEarthquakeState("predictMode");
    }

    setNewMagnitodeState(magnitode);
  };

  const handlePicStateOnClick = () => {
    setNewEarthquakeState("realtime");
    setWhiteBorderRealTimeBtn("white");
    setWhiteBorderPredictBtn("black");
    setShowMagnitodaInput(false);
  };

  return (
    <>
      <Toolbox layers={layers} setLayers={setLayers} />
      <button
        onClick={handlePicStateOnClick}
        className="-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
        style={{
          position: "absolute",
          top: "20px",
          left: "185px",
          zIndex: "1000",
          height: "50px",
          backgroundColor: "rgb(25 25 25)",
          borderRadius: "5px",
          width: "100px",
          border: `3px solid ${whiteBorderRealTimeBtn}`,
        }}
      >
        תמונת מצב
      </button>
      <button
        onClick={() => handlePredictionOnClick(false)}
        className="MuiButtonBase-root MuiFab-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
        style={{
          position: "absolute",
          top: "20px",
          left: "300px",
          zIndex: "1000",
          height: "50px",
          backgroundColor: "rgb(25 25 25)",
          borderRadius: "5px",
          width: "100px",
          border: `3px solid ${whiteBorderPredictBtn}`,
        }}
      >
        חיזוי
      </button>
      <input
        value={magnitode}
        min={4.5}
        max={13}
        onChange={(e) => setMagnitode(e.target.value)}
        placeholder="מגניטודה"
        type="text"
        style={{
          display: showMagnitodaInput ? "block" : "none",
          position: "absolute",
          top: "20px",
          left: "420px",
          zIndex: "1000",
          height: "50px",
          backgroundColor: "rgb(25 25 25)",
          borderRadius: "5px",
          width: "100px",
          color: "white",
        }}
      />
      <Button
        style={{
          display: showMagnitodaInput ? "block" : "none",
          position: "absolute",
          top: "80px",
          left: "425px",
          zIndex: "500",
          height: "max-content",
          backgroundColor: "rgb(25 25 25)",
          borderRadius: "5px",
          width: "100px",
          color: "white",
          textAlign: "center",
          justifyContent: "center",
        }}
        onClick={handlePredictionOnClick}
      >
        הפעל חיזוי
      </Button>
      <LayerDisplayer layers={layers} showLayers={true} />
    </>
  );
}

function Events() {
  const events = useRecoilValue(eventListState);
  const currentEvent = useRecoilValue(currentEventState);

  return (
    <>
      {currentEvent ? (
        <EventTitle />
      ) : (
        <OpenEventsTitle eventSum={events.length} isEarthquake={true} />
      )}
    </>
  );
}

export default function EarthquakeModule() {
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [isFileClicked, setIsFileClicked] = useState(false);
  const [isLegendClicked, setIsLegendClicked] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const [layers, setLayers] = useState(moduleLayers);
  const currentModule = useRecoilValue(currentModuleState);
  const storedModule = getLocalStorage(
    currentModuleKey,
    defaultModule,
    Object.values(modules)
  );

  useEffect(() => {
    setLocalStorage(currentModuleKey, currentModule);
  }, [currentModule]);

  return (
    <>
      <Map isFlyTo={currentModule !== storedModule}>
        <MapChildren layers={layers} setLayers={setLayers} />
        <SearchGeocoder />
      </Map>
      <Events />

      <BI />

      <BIButton
        title="מקרא"
        top={80}
        right={10}
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
              alt=""
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-green.png"
            />
            100% תפקוד
          </div>
          <div>
            <img
              alt=""
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-yellow.png"
            />
            92% - 77% תפקוד
          </div>
          <div>
            <img
              alt=""
              height={20}
              width={20}
              src="icons/layers/Electric/lightning-red.png"
            />
            50% - 0% תפקוד
          </div>
          <div>
            <img
              alt=""
              height={30}
              width={30}
              src="icons/layers/waters/blue-water-drop.png"
            />
            100% תפקוד
          </div>
          <div>
            <img
              alt=""
              height={30}
              width={30}
              src="icons/layers/waters/orange-water-drop.png"
            />
            92% - 77% תפקוד
          </div>
          <div>
            <img
              alt=""
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
        bottom={20}
        left={150}
        onClick={() => setIsFileClicked(!isFileClicked)}
        icon={<InsertDriveFile fontSize="large" color="white" />}
      />

      {isFileClicked && (
        <div
          style={{
            zIndex: 1001,
            position: "absolute",
            left: 300,
            bottom: 20,
          }}>
          <BIButton
            title="קדימה"
            top={870}
            left={580}
            onClick={() => {
              if (pageNumber === numPages) setPageNumber(numPages);
              else setPageNumber(pageNumber + 1);
            }}
            icon={<KeyboardArrowRight fontSize="large" color="white" />}
          />
          <BIButton
            title="אחורה"
            top={870}
            left={20}
            onClick={() => {
              if (pageNumber === 1) setPageNumber(1);
              else setPageNumber(pageNumber - 1);
            }}
            icon={<KeyboardArrowLeft fontSize="large" color="white" />}
          />
          <Document file="pdfFile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page height={930} pageNumber={pageNumber} />
          </Document>
        </div>
      )}

      <BIButton
        title="תחומי אחריות"
        bottom={20}
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
