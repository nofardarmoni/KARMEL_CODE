import { useCallback, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import _ from "lodash";
import { alertedAreasSocketUrl } from "@environment";
import { alertedAreasState } from "@states/alertedAreasState";
import { isDateRelevant } from "@services";

const RECONNECTION_TIME = 5000;

export default function AlertedAreasSubscriber() {
  const alertedAreasSocket = useRef();
  const setAlertedAreas = useSetRecoilState(alertedAreasState);

  const setupSocket = useCallback(() => {
    alertedAreasSocket.current = new WebSocket(alertedAreasSocketUrl);

    alertedAreasSocket.current.onopen = () => {
      console.log(`Subscribed to alerted areas socket`);
    };

    alertedAreasSocket.current.onclose = () => {
      console.log("alerted areas subscriber is closed");
      setTimeout(setupSocket, RECONNECTION_TIME);
    };

    alertedAreasSocket.current.onerror = (error) => {
      console.log("error in alerted areas socket: ", error);
      alertedAreasSocket.current.close();
    };
  }, []);

  const setupMessageListener = () => {
    alertedAreasSocket.current.onmessage = (message) => {
      const areas = JSON.parse(message.data)?.areas;

      const onDateAreas = areas.filter((area) => isDateRelevant(area.expiry));

      setAlertedAreas((prevAreas) => _.unionBy(onDateAreas, prevAreas, "id"));
    };
  };

  useEffect(setupSocket, [setupSocket]);

  useEffect(setupMessageListener);

  return null;
}
