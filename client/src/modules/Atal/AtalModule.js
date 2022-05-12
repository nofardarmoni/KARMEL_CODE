import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { EventsLayer } from "@layers";
import {
  EventTitle,
  LayerDisplayer,
  Map,
  OpenEventsTitle,
  SearchGeocoder,
  WarClock,
} from "@features";
import { AlertedAreasLayer } from "@features/alerted-areas";
import { currentEventState, eventListState } from "@states/eventState";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";

function MapChildren({ layers, setLayers }) {
  const events = useRecoilValue(eventListState);
  const currentEvent = useRecoilValue(currentEventState);
  return (
    <>
      <EventsLayer events={events} />
      <AlertedAreasLayer />
      <Toolbox layers={layers} setLayers={setLayers} />
      <LayerDisplayer
        layers={layers}
        showLayers={true}
        layerParams={{ polygon: currentEvent?.polygon }}
      />
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
        <OpenEventsTitle eventSum={events.length} />
      )}
    </>
  );
}
export default function AtalModule() {
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
      <WarClock />
      <Map isFlyTo={currentModule !== storedModule}>
        <MapChildren layers={layers} setLayers={setLayers} />
        <SearchGeocoder />
      </Map>
      <Events />
    </>
  );
}
