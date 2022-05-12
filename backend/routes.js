import { getWaterStations } from "./waterStations/waterStations.service";
import express from "express";
export const router = express.Router();

router.route("/earthquakeModule/waterStations").get(getWaterStations);
export default router;
