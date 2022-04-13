import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LayerDisplayer, Map, SearchGeocoder,  EventTitle,
  OpenEventsTitle,
 } from "@features";

import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";
import { currentEventState, eventListState } from "@states/eventState";

function MapChildren({ layers, setLayers }) {
  return (
    <>
      <Toolbox layers={layers} setLayers={setLayers} />
      <button className="MuiButtonBase-root MuiFab-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
       style={{position: 'absolute',  top: '20px', left: '85px', zIndex: '1000',  height: '50px', backgroundColor: 'rgb(25 25 25)', borderRadius:'5px',width:'100px'}}>תמונת מצב</button>
             <button className="MuiButtonBase-root MuiFab-root MuiSpeedDial-fab makeStyles-speedDialFab-44 MuiFab-primary"
       style={{position: 'absolute',  top: '20px', left: '200px', zIndex: '1000',height: '50px', backgroundColor: 'rgb(25 25 25)', borderRadius:'5px',width:'100px'}}>חיזוי</button>
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
  console.log("first", currentModule);
  console.log("storedModule", storedModule);
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
