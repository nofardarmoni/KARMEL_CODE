import React, { useEffect, useState } from "react";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { Button, makeStyles, Typography, Input } from "@material-ui/core";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import moment from "moment";
import "moment-duration-format";
import { errorMessageState } from "@states/errorMessageState";
import { useApiQuery } from "@hooks/useApiQuery";

const DEBOUNCE_TIME = 300;

const parseTravelRoutePointsFromApi = (points) =>
	points.map((point) => {
		return { lat: point.latitude, lng: point.longitude };
	});

const formatPositionsToApi = (positions) => positions.join(":");

const displayTravelDistance = (distance) => {
	if (distance >= 1000) {
		return `${(distance / 1000).toFixed(2)} ק"מ`;
	}

	return `${distance} מ'`;
};

const displayTravelTime = (time) =>
	moment.duration(time, "seconds").format("HH:mm:ss", { trim: false });

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexDirection: "column",
		zIndex: 1000,
		position: "absolute",
		backgroundColor: "#191919",
		bottom: 110,
		width: 220,
		height: 80,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		textAlign: "center",
		color: "white",
		paddingTop: 10,
		fontWeight: "bold",
		right: 0,
		left: 0,
		marginLeft: "auto",
		marginRight: "auto",
		opacity: 0.9,
	},
	title: {
		fontFamily: "AlmoniBold",
		fontSize: 17,
	},
	input: {
		width: 40,
		color: "white",
	},
	vertexIcon: {
		filter: "hue-rotate(270deg)",
	},
	button: {
		position: "absolute",
		color: "white",
		top: 0,
		left: 0,
	},
}));

export default function NavigationTool({ isClickDisabled }) {
	const classes = useStyles();
	const [selectedPositions, setSelectedPositions] = useState([]);
	const [travelRoute, setTravelRoute] = useState([]);
	const [travelDistance, setTravelDistance] = useState(0);
	const [travelTime, setTravelTime] = useState(0);
	const [vehicleHeight, setVehicleHeight] = useState(0);
	const setDebouncedVehicleHeight = _.debounce(setVehicleHeight, DEBOUNCE_TIME);
	const setErrorMessage = useSetRecoilState(errorMessageState);

	const vertexIcon = L.icon({
		iconUrl: "icons/maps/draw-vertex.png",
		iconSize: [10, 10],
		className: classes.vertexIcon,
	});

	const mapClickHandler = (event) => {
		if (selectedPositions.length === 2 || isClickDisabled) return;

		const coordinates = event.latlng;

		setSelectedPositions((prev) => {
			const positionsCopy = [...prev];
			positionsCopy.push([coordinates.lat, coordinates.lng]);

			return positionsCopy;
		});
	};

	const map = useMapEvent({
		click: mapClickHandler,
	});

	const handleChange = (event) => {
		const value = parseInt(event.target.value);

		event.persist();
		setDebouncedVehicleHeight(value);
	};

	const handleClear = () => {
		setSelectedPositions([]);
		setTravelRoute([]);
		setTravelDistance(0);
		setTravelTime(0);
	};

	const disableDoubleClickZoom = () => {
		map.doubleClickZoom.disable();
	};

	useApiQuery({
		dataPath: "navigation",
		fetchOnce: true,
		params: {
			vehicleHeight,
			positions: formatPositionsToApi(selectedPositions),
		},
		options: {
			enabled: selectedPositions.length === 2,
			onSuccess: (data) => {
				const route = data.routes[0];

				setTravelDistance(route.summary.lengthInMeters);
				setTravelTime(route.summary.travelTimeInSeconds);
				setTravelRoute(parseTravelRoutePointsFromApi(route.legs[0].points));
			},
			onError: () => {
				setErrorMessage("אוי לא... לא נמצא מסלול");
				handleClear();
			},
		},
	});

	useEffect(disableDoubleClickZoom);

	return (
		<>
			<Polyline color="orange" positions={travelRoute} />

			{selectedPositions.map((position, index) => (
				<Marker key={index} icon={vertexIcon} position={position} />
			))}

			<div className={`${classes.root} shadow`}>
				<Typography className={classes.title}>
					מרחק: {displayTravelDistance(travelDistance)}
				</Typography>

				<Typography className={classes.title}>
					זמן נסיעה: {displayTravelTime(travelTime)}
				</Typography>

				<Typography component="span" className={classes.title}>
					גובה רכב מירבי:{" "}
					<Input
						className={classes.input}
						margin="dense"
						onChange={handleChange}
						inputProps={{
							type: "number",
							min: 0,
						}}
					/>{" "}
					מ'
				</Typography>

				<Button className={classes.button} onClick={handleClear} size="small">
					נקה
				</Button>
			</div>
		</>
	);
}
