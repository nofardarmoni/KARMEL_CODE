import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  LayerDisplayer, Map, SearchGeocoder, EventTitle,
  OpenEventsTitle,
} from "@features";

import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";
import { currentEventState, eventListState } from "@states/eventState";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState"


function MapChildren({ layers, setLayers }) {
  const [showMagnitodaInput, setShowMagnitodaInput] = useState(false)
  const [magnitode, setMagnitode] = useState(0)
  const [newEarthquakeState, setNewEarthquakeState] = useRecoilState(earthquakeState)
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(magnitodeState)
  const predictValue = useRecoilValue(earthquakeState)

  useEffect(() => {
    console.log("showMagnitodaInput: ", showMagnitodaInput)
    console.log("newEarthquakeState: ", newEarthquakeState)

  }, [showMagnitodaInput, newEarthquakeState])

  const handlePredictionOnClick = () => {
    setShowMagnitodaInput(true)

    if (newEarthquakeState === 'realtime') {
      setNewEarthquakeState('predictMode')
    }

    setNewMagnitodeState(magnitode)
  }

  const handlePicStateOnClick = () => {
    setNewEarthquakeState('realtime')
    setShowMagnitodaInput(false)

  }


  return (
    <>
      <Toolbox layers={layers} setLayers={setLayers} />
      <button onClick={handlePicStateOnClick} className="MuiButtonBase-root MuiFab-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
        style={{ position: 'absolute', top: '20px', left: '85px', zIndex: '1000', height: '50px', backgroundColor: 'rgb(25 25 25)', borderRadius: '5px', width: '100px' }}>תמונת מצב</button>
      <button onClick={handlePredictionOnClick} className="MuiButtonBase-root MuiFab-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
        style={{ position: 'absolute', top: '20px', left: '200px', zIndex: '1000', height: '50px', backgroundColor: 'rgb(25 25 25)', borderRadius: '5px', width: '100px' }}>חיזוי</button>
      <input value={magnitode} min={4.5} max={13} onChange={(e) => setMagnitode(e.target.value)} placeholder="מגניטודה" type="text" style={{ display: showMagnitodaInput ? 'block' : 'none', position: 'absolute', top: '20px', left: '350px', zIndex: '1000', height: '50px', backgroundColor: 'rgb(25 25 25)', borderRadius: '5px', width: '100px', color: 'white' }} />
      <button style={{ display: showMagnitodaInput ? 'block' : 'none', position: 'absolute', top: '80px', left: '350px', zIndex: '500', height: '20px', backgroundColor: 'rgb(25 25 25)', borderRadius: '5px', width: '100px', color: 'white' }} onClick={handlePredictionOnClick}>הפעל חיזוי</button>
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
    </>
  );
}
