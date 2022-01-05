import React, { useRef, useState, useEffect } from "react";
import L from "leaflet";
import { Polygon, Marker, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEventState } from "@states/eventState";
import { usePrevious } from "@hooks/usePrevious";
import { isSpeedFlyState } from "@states/mapState";
import { eventSortModeState } from "@states/eventState";

export default function Event({ event }) {
  const map = useMap();
  const polygon = useRef();
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
  const prevEvent = usePrevious(currentEvent);
  const [opacity, setOpacity] = useState(0);
  const [polygonKey, setPolygonKey] = useState(0);
  const [fillOpacity, setFillOpacity] = useState(0);
  const isSpeedFly = useRecoilValue(isSpeedFlyState);
  const sortMode = useRecoilValue(eventSortModeState);

  const onEventClick = () => {
    if (isSpeedFly) {
      map.fitBounds(polygon.current.getBounds());
    } else {
      map.flyToBounds(polygon.current.getBounds());
    }
    setCurrentEvent(event);
  };

  const handleCurrentEvent = () => {
    if (currentEvent && currentEvent.id === event.id) {
      if (!prevEvent || prevEvent.id !== event.id) {
        if (isSpeedFly) {
          map.fitBounds(polygon.current.getBounds());
        } else {
          map.flyToBounds(polygon.current.getBounds());
        }
        setOpacity(1);
        setFillOpacity(0.3);
        setPolygonKey((prev) => prev + 1);
      }
    } else {
      setOpacity(0);
      setFillOpacity(0);
      setPolygonKey((prev) => prev + 1);
    }
  };

  useEffect(handleCurrentEvent, [
    currentEvent,
    event.id,
    isSpeedFly,
    map,
    prevEvent,
  ]);

  return (
    <>
      <Polygon
        key={polygonKey}
        positions={event.polygon}
        color="red"
        fillColor="red"
        opacity={opacity}
        fillOpacity={fillOpacity}
        ref={polygon}
      />

      {sortMode && event.rating && event.rating < 10 ? (
        <Marker
          position={event.coordinates}
          eventHandlers={{
            click: onEventClick,
          }}
          icon={missileSortIcons[event.rating]}
        />
      ) : (
        <Marker
          position={event.coordinates}
          eventHandlers={{
            click: onEventClick,
          }}
          icon={missileIcon}
        />
      )}
    </>
  );
}

const iconsUrl = "icons/events/missile/";

const missileIcon = L.icon({
  iconUrl: `${iconsUrl}missile-pin.png`,
  iconSize: [75, 103.5],
  iconAnchor: [40, 70],
});

const missileSortIcons = (() => {
  const obj = {};
  for (let i = 1; i <= 9; i++) {
    obj[i] = L.icon({
      iconUrl: `${iconsUrl}missile-pin${i}.png`,
      iconSize: [75, 103.5],
      iconAnchor: [40, 70],
    });
  }
  return obj;
})();
