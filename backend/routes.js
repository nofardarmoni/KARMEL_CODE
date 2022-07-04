import { getWaterStations } from "./waterStations/waterStations.service";
import express from "express";
import { getElectricStations } from "./electricStations/electricStations.service";
import { getGeneral } from "./general/general.service";
export const router = express.Router();

router
  .route("/earthquakeModule/waterStations")
  .get(getWaterStations);

router
  .route("/earthquakeModule/electricStations")
  .get(getElectricStations);

  router
  .route("/earthquakeModule/general")
  .get(getGeneral);
export default router;
