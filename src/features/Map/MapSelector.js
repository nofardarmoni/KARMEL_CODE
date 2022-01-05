import React from "react";
import { useRecoilValue } from "recoil";
import { mapTypeState } from "@states/mapState";
import { TileLayer } from "react-leaflet";
import { useEnv } from "@hooks/useEnv";

export default function MapSelector() {
  const mapType = useRecoilValue(mapTypeState);

  const data = useEnv();

  if (!data) return null;

  return (
    <>
      {Object.keys(data.maps).map(
        (map) =>
          mapType === map && (
            <TileLayer
              key={map}
              url={data.maps[map]}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              attribution={"<b>צוות שלדג</b>"}
            />
          )
      )}
    </>
  );
}
