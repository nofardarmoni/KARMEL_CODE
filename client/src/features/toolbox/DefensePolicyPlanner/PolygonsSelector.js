import React, { Fragment, useEffect, useState } from "react";
import { Polygon, Polyline, useMap } from "react-leaflet";
import { deepCompareMemo, getRandomColor } from "@services";

const POLYLINE_WEIGHT = 5;
const POLYLINE_COLOR = "black";

function PolygonSelector({
  polygonOptions,
  polygons = [],
  selectorCardFlag,
  setSelectorCardFlag,
  currentPolygon,
  setCurrentPolygon,
}) {
  const [polygonsWithColor, setPolygonsWithColor] = useState([]);
  const map = useMap();

  const handleClick = (polygon) => {
    setCurrentPolygon(polygon);
    setSelectorCardFlag(true);
    map.flyToBounds(polygon[polygonOptions.coordinatesField]);
  };

  useEffect(() => {
    const coloredPolygons = polygons.map((polygon) => {
      return {
        ...polygon,
        color: getRandomColor(),
      };
    });

    setPolygonsWithColor(coloredPolygons);
  }, [polygons]);

  return (
    <>
      {polygonsWithColor.map((polygon) => (
        <Fragment key={polygon[polygonOptions.idField]}>
          {selectorCardFlag ? (
            polygon[polygonOptions.idField] ===
              currentPolygon?.[polygonOptions.idField] && (
              <Polyline
                positions={polygon[polygonOptions.coordinatesField]}
                color={POLYLINE_COLOR}
                weight={POLYLINE_WEIGHT}
              />
            )
          ) : (
            <Polygon
              positions={polygon[polygonOptions.coordinatesField]}
              eventHandlers={{
                click: () => handleClick(polygon),
                mouseover: () => setCurrentPolygon(polygon),
                mouseout: () => setCurrentPolygon(null),
              }}
              color={POLYLINE_COLOR}
              weight={POLYLINE_WEIGHT}
              fillColor={polygon.color}
              pathOptions={{
                fillOpacity:
                  polygon[polygonOptions.idField] ===
                  currentPolygon?.[polygonOptions.idField]
                    ? 0.5
                    : 0,
              }}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default deepCompareMemo(PolygonSelector);
