import React from "react";
import { CamerasLayer, ForcesLayer, TrafficLayer } from "@layers";
import { forcesTypes } from "@constants";
export const layers = {
  traffic: {
    key: "traffic",
    isChecked: false,
    zoom: 10,
    label: "עומסי תנועה",
    component: () => <TrafficLayer />,
  },
  cameras: {
    key: "cameras",
    isChecked: true,
    distance: 2,
    zoom: 10,
    label: "מצלמות",
    component: ({ polygon, distance }) => (
      <CamerasLayer polygon={polygon} distance={distance} />
    ),
  },
  forces: {
    key: "forces",
    types: {
      police: {
        key: forcesTypes.police.key,
        isChecked: true,
        label: forcesTypes.police.label,
        component: ({ polygon, distance }) => (
          <ForcesLayer
            layerKey={forcesTypes.police.key}
            label={forcesTypes.police.label}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
    },
    distance: 10,
    zoom: 8,
    label: "כוחות",
  },
};
