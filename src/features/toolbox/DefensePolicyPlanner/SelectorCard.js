import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useMap } from "react-leaflet";
import { maxBounds } from "@constants";
import { deepCompareMemo } from "@services";
import { defaultPolicy } from "./defensePolicies";

const NAV_WIDTH_PER_LAYER = 110;

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		zIndex: 1000,
		position: "absolute",
		backgroundColor: "#191919",
		top: 150,
		right: 20,
		width: ({ numberOfLayers }) => NAV_WIDTH_PER_LAYER * numberOfLayers,
		borderRadius: 10,
	},
	closeButton: {
		position: "absolute",
		color: "white",
		top: 0,
		left: 0,
	},
});

function SelectorCard({
	layers,
	setSelectedLayers,
	setCurrentPolygon,
	setSelectorCardFlag,
	setDefensePolicySelectorFlag,
	setCurrentDefensePolicy,
	children,
}) {
	const numberOfLayers = Object.keys(layers).length;
	const classes = useStyles({ numberOfLayers });
	const map = useMap();

	const handleClose = () => {
		setCurrentPolygon(null);
		setSelectorCardFlag(false);
		setDefensePolicySelectorFlag(false);
		setSelectedLayers({});
		setCurrentDefensePolicy(defaultPolicy);
		map.dragging.enable();
		map.flyToBounds(maxBounds);
	};

	return (
		<div className={`${classes.root} shadow`}>
			<IconButton
				className={classes.closeButton}
				onClick={handleClose}
				size="small"
			>
				<CloseIcon fontSize="small" />
			</IconButton>

			{children}
		</div>
	);
}

export default deepCompareMemo(SelectorCard);
