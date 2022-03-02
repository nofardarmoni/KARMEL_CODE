import React from "react";
import { CamerasLayer, DistrictsLayer, SubDistrictsLayer } from "@layers";

export const layers = {
  cameras: {
    key: "cameras",
    isChecked: false,
    distance: 2,
    zoom: 8,
    label: "מצלמות",
    component: ({ polygon, distance }) => (
      <CamerasLayer polygon={polygon} distance={distance} />
    ),
  },
};
