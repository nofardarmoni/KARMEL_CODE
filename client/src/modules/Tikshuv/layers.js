import React from "react";
import {
  DistrictsLayer,
  SubDistrictsLayer,
  SirensLayer,
  SirensAnomaliesLayer,
} from "@layers";
import { sirensStatuses } from "@constants";

export const layers = {
  sirens: {
    key: "sirens",
    types: {
      normal: {
        key: "normal",
        isChecked: false,
        label: "תקין",
        component: ({ polygon, distance }) => (
          <SirensLayer
            status={sirensStatuses.normal}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
      minor: {
        key: "minor",
        isChecked: false,
        label: "מינורי",
        component: ({ polygon, distance }) => (
          <SirensLayer
            status={sirensStatuses.minor}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
      declined: {
        key: "declined",
        isChecked: false,
        label: "ירידה משרידות",
        component: ({ polygon, distance }) => (
          <SirensLayer
            status={sirensStatuses.declined}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
      disabled: {
        key: "disabled",
        isChecked: true,
        label: "מושבת - מטען/מצבר/תקשורת",
        component: ({ polygon, distance }) => (
          <SirensLayer
            status={sirensStatuses.disabled}
            polygon={polygon}
            distance={distance}
            voltage={false}
          />
        ),
      },
      disabledElectricity: {
        key: "disabledElectricity",
        isChecked: true,
        label: "מושבת - מתח רשת",
        component: ({ polygon, distance }) => (
          <SirensLayer
            status={sirensStatuses.disabled}
            polygon={polygon}
            distance={distance}
            voltage={true}
          />
        ),
      },
    },
    distance: 4,
    zoom: 8,
    label: "צופרים",
  },
  sirensAnomalies: {
    key: "sirensAnomalies",
    isChecked: false,
    label: "חריגות SLA",
    component: ({ polygon, distance }) => (
      <SirensAnomaliesLayer polygon={polygon} distance={distance} />
    ),
  },
  districts: {
    key: "districts",
    isChecked: true,
    label: "מחוזות",
    component: () => <DistrictsLayer />,
  },
  subDistricts: {
    key: "subDistricts",
    isChecked: false,
    label: "נפות",
    component: () => <SubDistrictsLayer />,
  },
};
