import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Map, SearchGeocoder, WarClock } from "@features";
import { currentModuleKey, modules, defaultModule } from "@constants";
import { getLocalStorage, setLocalStorage } from "@services";
import { currentModuleState } from "@states/moduleState";
import SimulatorToolBox from "./SimulatorToolBox";

export default function SimulatorModule() {
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
        <SimulatorToolBox />
        <SearchGeocoder />
      </Map>
    </>
  );
}
