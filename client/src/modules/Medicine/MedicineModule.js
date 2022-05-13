import React, { useEffect, useState, useRef } from "react";
import {
  LayerDisplayer,
  Map,
  WarClock,
  EventTitle,
  OpenEventsTitle,
  SearchGeocoder,
} from "@features";
import { BIButton, BIPanel } from "@features/bi";
import { HospitalsGraph } from "@features/graphs";
import { useRecoilValue } from "recoil";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";
import { defensePolicyLayers } from "./defensePolicyLayers";
import polygonsLayers from "./polygonsLayers.json";
import _ from "lodash";
import { AlertedAreasLayer } from "@features/alerted-areas";
import { EventsLayer } from "@layers";
import { currentEventState, eventListState } from "@states/eventState";

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
        <HospitalsGraph isSinceWar={true} />
        <HospitalsGraph />
      </BIPanel>
    </>
  );
}

function MapChildren({ layers, setLayers, defensePolicyOptions }) {
  const events = useRecoilValue(eventListState);
  const currentEvent = useRecoilValue(currentEventState);

  return (
    <>
      <EventsLayer events={events} />
      <AlertedAreasLayer />

      <Toolbox
        layers={layers}
        setLayers={setLayers}
        defensePolicyOptions={defensePolicyOptions}
      />

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

export default function MedicineModule() {
  const [layers, setLayers] = useState(moduleLayers);
  const [defensePolicyFlag, setDefensePolicyFlag] = useState(false);
  const layersRef = useRef(layers);
  const currentModule = useRecoilValue(currentModuleState);
  const storedModule = getLocalStorage(
    currentModuleKey,
    defaultModule,
    Object.values(modules)
  );

  useEffect(() => {
    if (defensePolicyFlag) {
      setLayers((prev) => {
        const prevCopy = _.cloneDeep(prev);
        layersRef.current = prev;

        Object.keys(prevCopy).forEach((key) => {
          prevCopy[key].isChecked = false;

          if (prevCopy[key].types) {
            Object.keys(prevCopy[key].types).forEach((typeKey) => {
              prevCopy[key].types[typeKey].isChecked = false;
            });
          }
        });

        return prevCopy;
      });
    } else {
      setLayers(layersRef.current);
    }
  }, [defensePolicyFlag]);

  useEffect(() => {
    setLocalStorage(currentModuleKey, currentModule);
  }, [currentModule]);

  return (
    <>
      <WarClock />

      <Map isFlyTo={currentModule !== storedModule}>
        <MapChildren
          layers={layers}
          setLayers={setLayers}
          defensePolicyOptions={{
            layers: defensePolicyLayers,
            polygonsLayers,
            defensePolicyFlag,
            setDefensePolicyFlag,
          }}
        />
        <SearchGeocoder />
      </Map>

      {!defensePolicyFlag && <Events />}

      <BI />
    </>
  );
}
