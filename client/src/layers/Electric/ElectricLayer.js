import React, { useState, useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { CustomPopup } from "@core";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { earthquakeState, magnitodeState } from "../../states/earthquakeState";
import { useRecoilState } from "recoil";

const toolTipDataNames = [
  {
    key: "ELEC_ADDRESS",
    title: "כתובת -",
  },
  {
    key: "ELEC_RAMAT_TIFKUD_CALC",
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
    key: "ELEC_CUSTEMERS_WITHOUT_ELEC_CALC",
    title: "מספר תושבים ללא חשמל-",
  },
];

const iconUrl = "icons/layers/Electric";

const electricIcon = L.icon({
  iconUrl: `${iconUrl}/lightning.png`,
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
  const classes = useStyles();
  const [electricStationsData, setElectricStationsData] = useState([]);
  const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
    magnitodeState
  );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/earthquakeModule/electricStations`)
      .then((res) => setElectricStationsData(res.data.recordset));
  }, []);

  if (!electricStationsData) return null;
  return (
    <>
      {electricStationsData.map((electricStation) => (
        // Create Icon
        <Marker
          key={electricStation.ELEC_KEY}
          position={[electricStation.ELEC_NZLEFT, electricStation.ELEC_NZRIGHT]}
          icon={electricIcon}
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
                      (electricStation["ELEC_RAMAT_TIFKUD"] ?? 0) < "100")) && (
                    <div key={row.key}>
                      {row.title} {electricStation[row.key] ?? "NOT IN DB"}
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
