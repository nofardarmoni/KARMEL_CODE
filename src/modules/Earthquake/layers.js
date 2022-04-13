//import React from "react";
//import { CamerasLayer, DistrictsLayer, SubDistrictsLayer } from "@layers";

//export const layers = {
  //cameras: {
    //key: "cameras",
    //isChecked: false,
    //distance: 2,
    //zoom: 8,
    //label: "מצלמות",
    //component: ({ polygon, distance }) => (
      //<CamerasLayer polygon={polygon} distance={distance} />
    //),
  //},
//};

import React from "react";
import {
  CamerasLayer,
  ClinicsLayer,
  DistrictsLayer,
  SubDistrictsLayer,
  ForcesLayer,
  SirensLayer,
} from "@layers";
import { sirensStatuses, forcesTypes } from "@constants";

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
  forces: {
    key: "forces",
    types: {
      mada: {
        key: forcesTypes.mada.key,
        isChecked: false,
        label: forcesTypes.mada.label,
        component: ({ polygon, distance }) => (
          <ForcesLayer
            layerKey={forcesTypes.mada.key}
            label={forcesTypes.mada.label}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
      police: {
        key: forcesTypes.police.key,
        isChecked: false,
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
      kaba: {
        key: forcesTypes.kaba.key,
        isChecked: false,
        label: forcesTypes.kaba.label,
        component: ({ polygon, distance }) => (
          <ForcesLayer
            layerKey={forcesTypes.kaba.key}
            label={forcesTypes.kaba.label}
            polygon={polygon}
            distance={distance}
          />
        ),
      },
      unitedHatzalah: {
        key: forcesTypes.unitedHatzalah.key,
        isChecked: false,
        label: forcesTypes.unitedHatzalah.label,
        component: ({ polygon, distance }) => (
          <ForcesLayer
            layerKey={forcesTypes.unitedHatzalah.key}
            label={forcesTypes.unitedHatzalah.label}
            polygon={polygon}
            distance={distance}
            showId
          />
        ),
      },
    },
    distance: 10,
    zoom: 8,
    label: "כוחות",
  },
  clinics: {
    key: "clinics",
    isChecked: false,
    distance: 4,
    zoom: 8,
    label: "מרפאות",
    component: ({ polygon, distance }) => (
      <ClinicsLayer
        polygon={polygon}
        distance={distance}
        onlyOpenClinics={true}
      />
    ),
  },
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
        isChecked: false,
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
        isChecked: false,
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
  districts: {
    key: "districts",
    isChecked: true,
    isAlwaysDisplayed: true,
    label: "מחוזות",
    component: () => <DistrictsLayer />,
  },
  subDistricts: {
    key: "subDistricts",
    isChecked: false,
    isAlwaysDisplayed: true,
    label: "נפות",
    component: () => <SubDistrictsLayer />,
  },
};

