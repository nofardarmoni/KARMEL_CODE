import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LayerDisplayer, Map, SearchGeocoder, WarClock } from "@features";
import { BIButton, BIPanel } from "@features/bi";
import {
  NotAlertedPopulationGraph,
  SirensActivityGraph,
  SirensStatusDetails,
} from "@features/graphs";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";
import { AlertedAreasLayer } from "@features/alerted-areas";
import { currentEventState } from "@states/eventState";

function BI() {
  const currentEvent = useRecoilValue(currentEventState);
  const [isBIPanelOpen, setIsBIPanelOpen] = useState(false);

  return (
    <>
      <BIButton onClick={() => setIsBIPanelOpen(!isBIPanelOpen)} />
      <BIPanel isOpen={isBIPanelOpen} sizePerRow={290} sizePerColumn={450}>
        <SirensActivityGraph />
        <SirensStatusDetails />
        <NotAlertedPopulationGraph event={currentEvent} />
      </BIPanel>
    </>
  );
}

function MapChildren({ layers, setLayers }) {
  const currentEvent = useRecoilValue(currentEventState);
  return (
    <>
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

export default function TikshuvModule() {
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

      <BI />
    </>
  );
}
