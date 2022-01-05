import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { LayerDisplayer, Map, SearchGeocoder, WarClock } from "@features";
import { Toolbox } from "@features/toolbox";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import polygonsLayers from "./polygonsLayers.json";
import { defensePolicyLayers } from "./defensePolicyLayers";
import { layers as moduleLayers } from "./layers";
import _ from "lodash";

function MapChildren({ layers, setLayers, defensePolicyOptions }) {
  return (
    <>
      <Toolbox
        layers={layers}
        setLayers={setLayers}
        defensePolicyOptions={defensePolicyOptions}
      />
      <LayerDisplayer layers={layers} showLayers={true} />
    </>
  );
}

export default function PopulationModule() {
  const [defensePolicyFlag, setDefensePolicyFlag] = useState(false);
  const [layers, setLayers] = useState(moduleLayers);
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
    </>
  );
}
