import React from "react";
import {
  ClinicsLayer,
  DistrictsLayer,
  SubDistrictsLayer,
  HospitalsLayer,
  HospitalSirensLayer,
  ForcesLayer,
  MentalInstitutesLayer,
  NursingHomesLayer,
  DialysisInstitutesLayer,
} from "@layers";
import { forcesTypes } from "@constants";

export const layers = {
  clinics: {
    key: "clinics",
    isChecked: false,
    distance: 4,
    zoom: 8,
    label: "מרפאות",
    component: ({ polygon, distance }) => (
      <ClinicsLayer polygon={polygon} distance={distance} />
    ),
  },
  hospitals: {
    key: "hospitals",
    isChecked: true,
    distance: 0,
    zoom: 8,
    label: "בתי חולים",
    component: ({ polygon, distance }) => (
      <HospitalsLayer polygon={polygon} distance={distance} />
    ),
  },
  sirens: {
    key: "sirens",
    isChecked: false,
    distance: 1,
    zoom: 8,
    label: "צופרי בתי חולים",
    component: ({ polygon, distance }) => (
      <HospitalSirensLayer polygon={polygon} distance={distance} />
    ),
  },
  dialysisInstitutes: {
    key: "dialysisInstitutes",
    isChecked: false,
    distance: 0,
    zoom: 8,
    label: "מכוני דיאליזה",
    component: ({ polygon, distance }) => (
      <DialysisInstitutesLayer polygon={polygon} distance={distance} />
    ),
  },
  mentalInstitutes: {
    key: "mentalInstitutes",
    isChecked: false,
    distance: 0,
    zoom: 8,
    label: "בריאות הנפש",
    component: ({ polygon, distance }) => (
      <MentalInstitutesLayer polygon={polygon} distance={distance} />
    ),
  },
  nursingHomes: {
    key: "nursingHomes",
    isChecked: false,
    distance: 0,
    zoom: 8,
    label: "מוסדות סיעודיים",
    component: ({ polygon, distance }) => (
      <NursingHomesLayer polygon={polygon} distance={distance} />
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
