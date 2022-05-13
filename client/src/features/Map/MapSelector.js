import React from "react";
import { TileLayer } from "react-leaflet";
export default function MapSelector() {

  const data = "https://{s}.google.com/vt/lyrs=s,h?hl=he&x={x}&y={y}&z={z}";

  if (!data) return null;

  return (
    <>
      <TileLayer
        url={data}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution={"<b>צוות שלדג</b>"}
      />
    </>
  );
}
