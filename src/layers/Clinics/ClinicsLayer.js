import React, { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { useApiQuery } from "@hooks/useApiQuery";
import { icons } from "./icons";
import details from "./popupDetails.json";
import { CustomPopup } from "@core";

const OPEN_STATUS = "פתוח";
const CLOSED_STATUS = "סגור";
const STATUS_FIELD = "Clinic_Status";
const COMPANY_FIELD = "Healthcare_Company";

const useStyles = makeStyles(() => ({
  details: {
    textAlign: "right",
    fontSize: 14,
    color: "white",
  },
  detail: {
    fontWeight: "bold",
  },
  grayIcon: {
    filter: "contrast(200%) grayscale(100%) brightness(80%)",
  },
}));

function ClinicsLayer({ polygon, distance, onlyOpenClinics }) {
  const classes = useStyles();
  const layerCache = useRef([]);

  const { data } = useApiQuery({
    dataPath: `layers/emergencyclinics`,
    label: "מרפאות",
    body: polygon && {
      polygon,
      distanceFromPolygon: distance,
    },
    options: { placeholderData: layerCache.current },
  });

  const getIcon = (data) => {
    const status = data[STATUS_FIELD];
    const icon = icons[data[COMPANY_FIELD]][data[STATUS_FIELD]];
    if (status === CLOSED_STATUS) icon.options.className = classes.grayIcon;
    return icon;
  };

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;

  return (
    <>
      {data.map(
        (clinic, index) =>
          (!onlyOpenClinics || clinic[STATUS_FIELD] === OPEN_STATUS) && (
            <Marker
              key={index}
              position={[clinic.latitude, clinic.longitude]}
              icon={getIcon(clinic)}
            >
              <CustomPopup>
                {Object.keys(details).map(
                  (detail) =>
                    details[detail] &&
                    clinic[detail] !== null && (
                      <div key={detail} className={classes.details}>
                        <span className={classes.detail}>
                          {`${details[detail]}: `}
                        </span>
                        <span>{clinic[detail]}</span>
                      </div>
                    )
                )}
              </CustomPopup>
            </Marker>
          )
      )}
    </>
  );
}

export default deepCompareMemo(ClinicsLayer);
