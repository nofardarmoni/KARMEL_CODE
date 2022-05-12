import { getWaterStations } from "./waterStations/waterStations.service";

var express = require("express");
export const router = express.Router();

router.route("/earthquakeModule/waterStations").get(getWaterStations);

export default router;