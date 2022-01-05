import { atom } from "recoil";
import { getLocalStorage } from "@services";
import { currentModuleKey, modules } from "@constants";
import { defaultModule } from "@constants";

const currentModule = getLocalStorage(
  currentModuleKey,
  defaultModule,
  Object.values(modules)
);

export const currentModuleState = atom({
  key: "currentModuleState",
  default: currentModule,
});
