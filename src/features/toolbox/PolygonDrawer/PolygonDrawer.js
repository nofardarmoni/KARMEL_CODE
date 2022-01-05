import React, { useState, useRef, memo, useEffect } from "react";
import L from "leaflet";
import { Polygon, Marker, useMapEvents } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEventState } from "@states/eventState";
import { eventTypes } from "@constants";
import { isSpeedFlyState } from "@states/mapState";
import { arePolygonsEqual } from "@services";

const iconsUrl = "icons/maps/";

const vertexIcon = L.icon({
	iconUrl: `${iconsUrl}draw-vertex.png`,
	iconSize: [10, 10],
});

function PolygonDrawer({
	isPolygonClosed,
	setIsPolygonClosed,
	isClickDisabled,
}) {
	const [points, setPoints] = useState([]);
	const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
	const isSpeedFly = useRecoilValue(isSpeedFlyState);
	const polygon = useRef();

	const draw = (event) => {
		if (isPolygonClosed || isClickDisabled) return;
		setPoints(points.concat([[event.latlng.lat, event.latlng.lng]]));
	};

	const createDrawingEvent = () => {
		const prevPolygon = currentEvent?.polygon;
		const nextPolygon = points.concat([points[0]]);

		if (!prevPolygon || !arePolygonsEqual(prevPolygon, nextPolygon)) {
			setCurrentEvent({
				polygon: nextPolygon,
				type: eventTypes.Drawing.name,
			});
		}

		if (map.getZoom() < map.getBoundsZoom(polygon.current.getBounds())) {
			if (isSpeedFly) {
				map.fitBounds(polygon.current.getBounds());
			} else {
				map.flyToBounds(polygon.current.getBounds());
			}
		}
	};

	const closePolygon = () => {
		if (isPolygonClosed || isClickDisabled || points.length <= 3) return;
		setIsPolygonClosed(true);
		createDrawingEvent();
	};

	const map = useMapEvents({
		click: draw,
		dblclick: closePolygon,
	});

	const disableDoubleClickZoom = () => {
		map.doubleClickZoom.disable();
	};

	useEffect(disableDoubleClickZoom);

	return (
		<>
			{isPolygonClosed ? (
				<Polygon
					key={1}
					color="cyan"
					opacity={0.4}
					fillOpacity={0.2}
					positions={points}
					eventHandlers={{
						click: createDrawingEvent,
					}}
					ref={polygon}
				/>
			) : (
				<>
					<Polygon key={2} color="lime" positions={points} />
					{points.map((point, index) => (
						<Marker key={index} position={point} icon={vertexIcon}></Marker>
					))}
				</>
			)}
		</>
	);
}

export default memo(PolygonDrawer);
