import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { makeStyles } from "@material-ui/core";
import { deepCompareMemo } from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import details from "./popupDetails.json";
import { CustomPopup } from "@core";

const useStyles = makeStyles(() => ({
	details: {
		textAlign: "right",
		fontSize: 14,
		color: "white",
	},
	detail: {
		fontWeight: "bold",
	},
}));

function PostOfficesLayer() {
	const classes = useStyles();

	const iconsUrl = "icons/layers/post-offices/";
	const postOfficeIcon = L.icon({
		iconSize: [25, 30],
		iconUrl: `${iconsUrl}post-office-position.png`,
	});

const { data: postOffices } = useApiQuery({
		dataPath: "layers/postoffices",
		label: "יחידות דואר",
		options: {
			select: (data) =>
				data.filter((datum) => datum.latitude && datum.longitude),
		},
	});

	if (!postOffices) return null;

	return (
    <>
      {postOffices.map((office) => (
        <Marker
          key={office.id}
          position={[office.latitude, office.longitude]}
          icon={postOfficeIcon}
        >
          <CustomPopup>
            {Object.keys(details).map(
              (detail) =>
                details[detail] &&
                office[detail] !== null && (
                  <div key={detail} className={classes.details}>
                    <span className={classes.detail}>
                      {`${details[detail]}: `}
                    </span>
                    <span>{office[detail]}</span>
                  </div>
                )
            )}
          </CustomPopup>
        </Marker>
      ))}
    </>
  );
}

export default deepCompareMemo(PostOfficesLayer);
