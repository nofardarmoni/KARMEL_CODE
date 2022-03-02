import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LayerDisplayer, Map, SearchGeocoder, WarClock } from "@features";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import { layers as moduleLayers } from "./layers";

function MapChildren({ layers, setLayers }) {
  return (
    <>
      <Toolbox layers={layers} setLayers={setLayers} />

      <LayerDisplayer layers={layers} showLayers={true} />
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
    </>
  );
}
