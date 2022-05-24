import { atom } from "recoil";

export const earthquakeState = atom({
  key: "earthquakeState",
  default: 'realtime',
});


export const magnitodeState = atom({
  key: "magnitodeState",
  default: null,
});
