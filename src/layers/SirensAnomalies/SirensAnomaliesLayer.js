import React, { useRef, useEffect, useState } from "react";
import { useApiQuery } from "@hooks/useApiQuery";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { deepCompareMemo, polygonToWKT } from "@services";
import { Tab, Tabs, makeStyles } from "@material-ui/core";
import moment from "moment";
import { CustomPopup } from "@core";

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
    fontFamily: "AlmoniBold",
    fontSize: 16,
  },
  details: {
    paddingTop: 10,
    color: "white",
    textAlign: "right",
    fontSize: 14,
  },
}));

const getRelevantAnomalies = (anomalies, failureTypes) => {
  return anomalies
    .map((anomaly) => ({
      ...anomaly,
      failureType: failureTypes.find(({ id }) => id === anomaly.failureTypeId),
    }))
    .filter((anomaly) => anomaly.failureType.isRelevant);
};

function AnomalyPopup({ siren }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(siren.anomalies[0].uid);

  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const getAnomalyTime = (endTime, anomalyTime) => {
    endTime = endTime ? moment(endTime) : moment();
    anomalyTime = moment(anomalyTime);
    return Math.floor(moment.duration(endTime.diff(anomalyTime)).asHours());
  };

  return (
    <CustomPopup>
      <Tabs
        value={currentTab}
        variant="fullWidth"
        indicatorColor="primary"
        onChange={handleChange}
      >
        {siren.anomalies.map(({ uid, failureType }) => (
          <Tab
            key={uid}
            value={uid}
            label={failureType ? failureType.label : "חריגה"}
            className={classes.title}
          />
        ))}
      </Tabs>
      {siren.anomalies.map(
        ({ uid, failureType, startTime, endTime, anomalyTime }) =>
          uid === currentTab && (
            <div key={uid} className={classes.details}>
              <b>מזהה צופר:</b>
              {` ${siren.mdlc}`}
              <br />
              <b>שם צופר:</b>
              {` ${siren.name}`}
              <br />
              <b>תקלה רגילה/משביתה:</b>{" "}
              {failureType?.isRegular ? "רגילה" : "משביתה"}
              <br />
              <b>תקלת צופר/בקר:</b>{" "}
              {failureType?.isSirenFailure ? "צופר" : "בקר"}
              <br />
              <b>תאריך תחילת התקלה:</b>{" "}
              {moment(startTime).format("DD/MM/YYYY, HH:mm")}
              <br />
              <b>תאריך סיום התקלה:</b>{" "}
              {endTime ? moment(endTime).format("DD/MM/YYYY, HH:mm") : "אין"}
              <br />
              <b>זמן חריגה:</b> {getAnomalyTime(endTime, anomalyTime)} שעות
            </div>
          )
      )}
    </CustomPopup>
  );
}

const sirenIcon = L.icon({
  iconUrl: `icons/layers/sirens/red-siren/red-siren.png`,
  iconSize: [30, 30],
});

function SirensAnomaliesLayer({ polygon, distance }) {
  const layerCache = useRef();

  const { data: anomaliesData } = useApiQuery({
    dataPath: "sirens/failures",
    label: `שכבת חריגות`,
    params: { isAnomaly: true },
  });

  const { data: failureTypes } = useApiQuery({
    dataPath: "sirens/failures/types",
    label: "סוגי תקלות צופר",
    fetchOnce: true,
  });

  const { data } = useApiQuery({
    dataPath: "sirens/get-sirens",
    label: "צופרים",
    body: polygon && {
      wktPolygon: polygonToWKT(polygon),
      distanceFromPolygon: distance,
    },
    options: {
      placeholderData: layerCache.current,
      select: (sirens) => {
        if (!anomaliesData) return [];
        return sirens
          .map((siren) => ({
            ...siren,
            anomalies: getRelevantAnomalies(
              anomaliesData.filter(
                ({ mdlc, endTime }) => mdlc === siren.mdlc && !endTime
              ),
              failureTypes
            ),
          }))
          .filter((siren) => siren.anomalies.length > 0);
      },
    },
  });

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data || !anomaliesData) return null;
  return (
    <>
      {data.map((siren) => (
        <Marker
          key={siren.mdlc}
          position={[siren.latitude, siren.longitude]}
          icon={sirenIcon}
        >
          <AnomalyPopup siren={siren}></AnomalyPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(SirensAnomaliesLayer);
