import React, { Fragment, useState } from "react";
import { useMapEvent } from "react-leaflet";

export default function LayerDisplayer({ layers, showLayers, layerParams }) {
  const map = useMapEvent({
    zoom: () => {
      setCurrentZoom(map.getZoom());
    },
  });
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());

  const renderLayer = (layer, params) => {
    return layer.isChecked && layer.component && layer.component(params);
  };

  return (
    <>
      {Object.values(layers).map((layer) => (
        <Fragment key={layer.key}>
          {currentZoom >= (layer.zoom ?? 0) &&
            (showLayers || layer.isAlwaysDisplayed) &&
            (layer.types
              ? Object.values(layer.types).map((type) => (
                  <Fragment key={type.key}>
                    {renderLayer(type, {
                      distance: layer.distance,
                      ...layerParams,
                    })}
                  </Fragment>
                ))
              : renderLayer(layer, {
                  distance: layer.distance,
                  ...layerParams,
                }))}
        </Fragment>
      ))}
    </>
  );
}
