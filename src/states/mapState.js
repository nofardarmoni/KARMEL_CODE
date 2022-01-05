import { atom } from "recoil";
import {
  defaultMapType,
  defaultIsSpeedFly,
} from "@constants";

export const mapTypeState = atom({
  key: "mapTypeState",
  default: defaultMapType,
});

export const isSpeedFlyState = atom({
  key: "isSpeedFlyState",
  default: defaultIsSpeedFly,
});
