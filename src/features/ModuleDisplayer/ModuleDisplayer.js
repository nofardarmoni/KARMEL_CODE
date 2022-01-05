import React from "react";
import { useRecoilValue } from "recoil";
import { currentModuleState } from "@states/moduleState";
import {
  AtalModule,
  HomeFrontCommandModule,
  MedicineModule,
  NationalEmergencyAuthorityModule,
  PopulationModule,
  TikshuvModule,
  SimulatorModule
} from "@modules";
import { modules } from "@constants";

export default function ModuleDisplayer() {
  const currentModule = useRecoilValue(currentModuleState);

  return (
    <>
      {currentModule === modules.homeFrontCommand && <HomeFrontCommandModule />}
      {currentModule === modules.medicine && <MedicineModule />}
      {currentModule === modules.population && <PopulationModule />}
      {currentModule === modules.tikshuv && <TikshuvModule />}
      {currentModule === modules.nationalEmergencyAuthority && (
        <NationalEmergencyAuthorityModule />
      )}
      {currentModule === modules.atal && <AtalModule />}
      {currentModule === modules.simulator && <SimulatorModule />}
    </>
  );
}
