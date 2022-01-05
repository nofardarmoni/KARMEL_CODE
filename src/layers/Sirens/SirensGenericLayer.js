import React, { Fragment } from "react";
import { Marker, Polygon } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { makeStyles } from "@material-ui/core";
import { icons } from "./icons";
import {
  sirensStatuses,
  defaultSirensStatus,
  minAlertCount,
  maxAlertCount,
} from "@constants";
import moment from "moment";
import { useApiQuery } from "@hooks/useApiQuery";
import L from "leaflet";
import _ from "lodash";
import { CustomPopup } from "@core";

let isClicked = false;
const VOLTAGE_ICON_NUM = 5;

const isSirenDisabled = (siren) =>
  siren.status === sirensStatuses.disabled.value &&
  (!siren.voltage || siren.alertCount === 0);

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "AlmoniBold",
    color: "white",
  },
  detail: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
}));

const getIcon = (sirenStatus) => icons[sirenStatus] ?? icons.default;

const getBatteryIcon = (alertCount) => {
  const batteriesIconsUrl = "icons/layers/sirens/batteries";
  const roundPrecision = -1;

  const parsedCount = parseInt(alertCount) || minAlertCount;
  const clampedCount = _.clamp(parsedCount, minAlertCount, maxAlertCount);
  const percentage = (clampedCount * 100) / maxAlertCount;
  const roundedPercentage = _.round(percentage, roundPrecision);

  return L.icon({
    iconUrl: `${batteriesIconsUrl}/battery${roundedPercentage}.png`,
    iconSize: [15, 29],
    iconAnchor: [-15, 10],
  });
};

const getStatusLabelByValue = (sirenStatus) => {
  const status = Object.values(sirensStatuses).find(
    (status) => status.value === sirenStatus
  );

  return status?.label ?? defaultSirensStatus.label;
};

function SirensGenericLayer({ sirens }) {
  const classes = useStyles();

  const { data: failureTypes } = useApiQuery({
    dataPath: "sirens/failures/types",
    label: "סוגי תקלות צופר",
    fetchOnce: true,
  });

  const getSirenFailures = (siren) => {
    return failureTypes
      ? failureTypes
          .filter((type) => siren[type.name])
          .map((type) => type.label)
      : [];
  };

  if (!sirens) return null;
  return (
    <>
      {sirens.map((siren) => {
        const failures = getSirenFailures(siren);
        return (
          <Fragment key={siren.mdlc}>
            <Marker
              position={[siren.latitude, siren.longitude]}
              eventHandlers={{
                mouseover: (e) => {
                  if (!isClicked) {
                    e.target.openPopup();
                  }
                },
                mouseout: (e) => {
                  if (!isClicked) {
                    e.target.closePopup();
                  }
                },
                click: (e) => {
                  isClicked = true;
                  e.target.openPopup();
                },
                popupclose: () => {
                  isClicked = false;
                },
              }}
              icon={getIcon(
                siren.voltage && siren.status === sirensStatuses.disabled.value
                  ? VOLTAGE_ICON_NUM
                  : siren.status
              )}
            >
              <CustomPopup>
                <div className={classes.title}>{siren.name}</div>
                <div className={classes.detail}>
                  <b>מזהה: </b> {siren.mdlc}
                </div>
                <div className={classes.detail}>
                  <b>סטטוס: </b> {getStatusLabelByValue(siren.status)}
                </div>
                {siren.voltage && (
                  <div className={classes.detail}>
                    <b>מס' צפירות שנותרו: </b> {siren.alertCount}
                  </div>
                )}
                {failures.length > 0 && (
                  <div className={classes.detail}>
                    <b>תקלות: </b> {failures.join(", ")}
                  </div>
                )}
                <div className={classes.detail}>
                  <b>תאריך עדכון: </b>
                  {moment(siren.reportTime).format("DD/MM/YYYY, HH:mm")}
                </div>
              </CustomPopup>
            </Marker>
            {siren.voltage && (
              <Marker
                position={[siren.latitude, siren.longitude]}
                icon={getBatteryIcon(siren.alertCount)}
              />
            )}
            {isSirenDisabled(siren) && (
              <Polygon color="red" positions={siren.coverage} />
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default deepCompareMemo(SirensGenericLayer);
