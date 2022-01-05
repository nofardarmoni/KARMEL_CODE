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
import { BIButton, BIPanel } from "@features/bi";
import { AlertedAreasLayer } from "@features/alerted-areas";
import {
  PopulationGraph,
  SchoolsGraph,
  SheltersGraph,
  NotAlertedPopulationGraph,
} from "@features/graphs";
import { currentEventState, eventListState } from "@states/eventState";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";

function BI() {
  const currentEvent = useRecoilValue(currentEventState);
  const [isBIPanelOpen, setIsBIPanelOpen] = useState(false);

  return (
    currentEvent && (
      <>
        <BIButton onClick={() => setIsBIPanelOpen(!isBIPanelOpen)} />
        <BIPanel isOpen={isBIPanelOpen}>
          <PopulationGraph event={currentEvent} />
          <SchoolsGraph polygon={currentEvent.polygon} />
          <SheltersGraph />
          <NotAlertedPopulationGraph event={currentEvent} />
        </BIPanel>
      </>
    )
  );
}

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

export default function HomeFrontCommandModule() {
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

      <BI />
    </>
  );
}
