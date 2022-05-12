import React, { useEffect, useState } from "react";
import { Polygon } from "react-leaflet";
import { useRecoilState } from "recoil";
import { alertedAreasState } from "@states/alertedAreasState";
import { isDateRelevant } from "@services";

const ONE_SECOND = 1000;
const CHECK_EXPIRE_TIME = ONE_SECOND * 1.5;
const FLICKER_TIME = CHECK_EXPIRE_TIME / 2;

export default function AlertedAreaLayer() {
  const [showAreas, setshowAreas] = useState(1);
  const [alertedAreas, setAlertedAreas] = useRecoilState(alertedAreasState);

  const makeAreasFlicker = () => {
    setshowAreas(0);
    setTimeout(() => {
      setshowAreas(1);
    }, FLICKER_TIME);
  };

  useEffect(() => {
    if (alertedAreas.length) {
      const expiryInterval = setInterval(() => {
        setAlertedAreas((areas) =>
          areas.filter((area) => isDateRelevant(area.expiry))
        );

        makeAreasFlicker();
      }, CHECK_EXPIRE_TIME);

      return () => {
        clearInterval(expiryInterval);
      };
    }
  }, [alertedAreas, setAlertedAreas]);

  return (
    <>
      {alertedAreas.map((area) => (
        <Polygon
          key={showAreas ? area.id : area.id * -1}
          opacity={1}
          fillOpacity={0.3}
          color={showAreas ? "#5f0021" : "#ab003c"}
          positions={area.polygon}
        />
      ))}
    </>
  );
}
