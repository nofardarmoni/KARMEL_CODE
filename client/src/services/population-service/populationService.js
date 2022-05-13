import { precisionSecondsBuffer } from "@constants";

const isDatePassed = (firstDate, secondDate, secondsBuffer = 0) =>
  firstDate / 1000 + secondsBuffer < Date.parse(secondDate) / 1000;

export const isPrecise = (event) =>
  !event?.impactTime ||
  !isDatePassed(Date.now(), event.impactTime, precisionSecondsBuffer);

export const calculateTotalPopulation = (data) =>
  Object.values(data).reduce((prev, current) => prev + current, 0);
