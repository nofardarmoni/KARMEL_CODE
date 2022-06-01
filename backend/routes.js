import { getWaterStations } from "./waterStations/waterStations.service";
import express from "express";
import { getElectricStations } from "./electricStations/electricStations.service";
export const router = express.Router();

router
  .route("/earthquakeModule/waterStations")
  .get(getWaterStations);

router
  .route("/earthquakeModule/electricStations")
  .get(getElectricStations);
export default router;
