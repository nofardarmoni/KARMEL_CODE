import React, { useState, useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { CustomPopup } from "@core";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";
import { useRecoilValue, selector, useRecoilState } from "recoil";

import { statecalc, calc } from "../Water/WaterLayer";
import { icons } from "./electricIcons";

const toolTipDataNames = [
  {
    key: "ELEC_ADDRESS",
    title: "כתובת -",
  },
  {
    key: "ELEC_RAMAT_TIFKUD",
    title: "רמת תפקוד -",
  },
  {
    key: "ELEC_REPAIR_TIME",
    title: "צפי תיקון -",
    isConditional: true,
  },
  {
    key: "ELEC_PHONE",
    title: 'קב"ט -',
  },
  {
    key: "ELEC_TOTAL_CUSTOMERS",
    title: "מספר תושבים -",
  },
  {
    key: "ELEC_CUSTEMERS_WITHOUT_ELEC",
    title: "מספר תושבים ללא חשמל-",
  },
];

const iconUrl = "icons/layers/Electric";

const electricIcon = L.icon({
  iconUrl: `${iconUrl}/lightning-green.png`,
  iconSize: [20, 20],
});

const useStyles = makeStyles(() => ({
  tootlipTitle: {
    fontSize: 18,
    fontFamily: "AlmoniBold",
    display: "flex",
    justifyContent: "center",
  },
  tootlipContent: {
    fontSize: 14,
    fontFamily: "AlmoniBold",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function ElectricLayer() {
  const mode = useRecoilValue(earthquakeState);

  const classes = useStyles();
  const [electricStationsData, setElectricStationsData] = useState([]);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );

  const [magntideRangeState, setMagntideRangeState] = useState(null);

  useEffect(() => getMagnitodeRange())
  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/electricStations`)
      .then((res) => setElectricStationsData(res.data.recordset));
  }, []);

  const getMagnitodeRange = () => {
    if (newMagnitodeState >= 4.5 && newMagnitodeState <= 4.9) {
      setMagntideRangeState("ELEC_MAGNITDE_4_5_4_9");
    } else if (newMagnitodeState >= 5 && newMagnitodeState <= 6.5) {
      setMagntideRangeState("ELEC_MAGNITDE_4_6_6_5");
    } else if (newMagnitodeState >= 6.6 && newMagnitodeState <= 7) {
      setMagntideRangeState("ELEC_MAGNITDE_6_6_7");
    } else if (newMagnitodeState >= 7.1 && newMagnitodeState <= 7.5) {
      setMagntideRangeState("ELEC_MAGNITDE_7_1_7_5");
    } else {
      setMagntideRangeState("ELEC_MAGNITDE_UP_TO_7_6");
    }
  };

  const getMarkerColor = (levelOfFunctioning) => {
    console.log(`levelOfFunctioning: ${typeof levelOfFunctioning}`);
    if (newMagnitodeState < 4.5) {
      return "lightning-green";
    }
    if (levelOfFunctioning <= 50) {
      return "lightning-red";
    } else if (levelOfFunctioning < 92) {
      return "lightning-yellow";
    } else {
      return "lightning-green";
    }
  };

  if (!electricStationsData) return null;
  return (
    <>
      {electricStationsData.map((electricStation) => (
        // Create Icon
        <Marker
          key={electricStation.ELEC_KEY}
          position={[electricStation.ELEC_NZLEFT, electricStation.ELEC_NZRIGHT]}
          icon={icons[getMarkerColor(100 -
            statecalc(
              mode,
              electricStation[magntideRangeState],
              100,
              100 - parseInt(electricStation.ELEC_RAMAT_TIFKUD)
            ))]}
          eventHandlers={{
            click: (_) => {
              if (earthquakeState.key !== "realtime") {
                newMagnitodeState && calc(electricStation[magntideRangeState]);
              }
            },
          }}
        >
          <CustomPopup closeButton={false}>
            <div className={classes.tootlipTitle}>
              תחנת כוח - {electricStation.ELEC_STATION_NAME}
            </div>
            <div className={classes.tootlipContent}>
              {toolTipDataNames.map(
                (row, _) =>
                  (!row.isConditional ||
                    (row.isConditional &&
                      (parseFloat(electricStation["ELEC_RAMAT_TIFKUD"]) ?? 0) < 100)) && (
                    <div key={row.key}>
                      {row.title}
                      {/* {electricStation[row.key] ?? "לא הוזן"} */}
                      {row.key === "ELEC_CUSTEMERS_WITHOUT_ELEC"
                        ? parseInt(
                          statecalc(
                            mode,
                            electricStation[magntideRangeState],
                            electricStation.ELEC_TOTAL_CUSTOMERS,
                            electricStation.ELEC_CUSTEMERS_WITHOUT_ELEC
                          )
                        )
                        : row.key === "ELEC_RAMAT_TIFKUD"
                          ? 100 -
                          statecalc(
                            mode,
                            electricStation[magntideRangeState],
                            100,
                            100 - parseInt(electricStation.ELEC_RAMAT_TIFKUD)
                          ) +
                          "%"
                          : electricStation[row.key]}
                    </div>
                  )
              )}
            </div>
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(ElectricLayer);
