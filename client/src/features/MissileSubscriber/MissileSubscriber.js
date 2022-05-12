import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  eventListState,
  currentEventState,
  updateEventList,
} from "@states/eventState";
import { ellipseSocketUrl } from "@environment";
import { eventTypes } from "@constants";

const RECONNECTION_TIME = 5000;

export default function MissileSubscriber() {
  const [eventList, setEventList] = useRecoilState(eventListState);
  const missileSubscriber = useRef();
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

  const setupSocket = useCallback(() => {
    missileSubscriber.current = new WebSocket(ellipseSocketUrl);

    missileSubscriber.current.onopen = () => {
      console.log(`Subscribed to missiles socket`);
    };

    missileSubscriber.current.onclose = () => {
      console.log("Missile subscriber is closed");
      setTimeout(setupSocket, RECONNECTION_TIME);
    };

    missileSubscriber.current.onerror = (error) => {
      console.log("error in missle socket: ", error);
      missileSubscriber.current.close();
    };
  }, []);

  const setupMessageListener = () => {
    missileSubscriber.current.onmessage = (message) => {
      const event = JSON.parse(message.data);
      event.type = eventTypes.Missile.name;
      setEventList(updateEventList(eventList, event));
      if (currentEvent && currentEvent.id === event.id) {
        setCurrentEvent(event);
      }
    };
  };

  useEffect(setupSocket, [setupSocket]);

  useEffect(setupMessageListener);

  return null;
}
