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
import { Button } from "@material-ui/core";
import { BIButton, BIPanel } from "@features/bi";
import { DistributionStationsGraph, HospitalsGraph, WaterBarGraph, WaterDistributionGraph, WaterGraph } from "@features/graphs";

const BI_PANEL_MIN_WIDTH = 450;
const BI_PANEL_MIN_HEIGHT = 260;

function BI() {
  const [isBIPanelOpen, setIsBIPanelOpen] = useState(false);

  return (
    <>
      <BIButton onClick={() => setIsBIPanelOpen(!isBIPanelOpen)} />
      <BIPanel
        isOpen={isBIPanelOpen}
        sizePerColumn={BI_PANEL_MIN_WIDTH}
        sizePerRow={BI_PANEL_MIN_HEIGHT}
      >
        <WaterBarGraph />
        <WaterGraph />
        <DistributionStationsGraph />
        <WaterDistributionGraph />
      </BIPanel>
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
  const [whiteBorderRealTimeBtn, setWhiteBorderRealTimeBtn] = useState("black");
  const [whiteBorderPredictBtn, setWhiteBorderPredictBtn] = useState("black");

  // useEffect(() => {
  //   console.log("newEarthquakeState: ", newEarthquakeState)
  //   if (earthquakeState === "realtime") {
  //     setWhiteBorderRealTimeBtn("white");
  //     setWhiteBorderPredictBtn("black");
  //   } else if (earthquakeState === "predictMode") {
  //     setWhiteBorderPredictBtn("white");
  //     setWhiteBorderRealTimeBtn("black");
  //   }
  // }, [newEarthquakeState]);

  const handlePredictionOnClick = (checkMagnitode= true) => {
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
      MuiButtonBase-root MuiFab
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
          border: `1px solid ${whiteBorderRealTimeBtn}`,
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
          border: `1px solid ${whiteBorderPredictBtn}`,
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
          left: "420px",
          zIndex: "500",
          height: "20px",
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
    </>
  );
}
