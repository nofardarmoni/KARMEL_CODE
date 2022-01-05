import React from "react";
import { TileLayer } from "react-leaflet";

export default function TrafficLayer() {
  const azureMapUrl =
    "https://atlas.microsoft.com/traffic/flow/tile/png?subscription-key=2PpJeR9NGfXZUNGLcPsUkJ7V17B12_k9-994kmDvE8c&api-version=1.0&style=relative-delay&zoom={z}&x={x}&y={y}&thickness=10";

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">AzureMap</a> contributors'
        url={azureMapUrl}
      />
    </>
  );
}
