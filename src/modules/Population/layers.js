import React from "react";
import {
  DistrictsLayer,
  SubDistrictsLayer,
  PostOfficesLayer,
  ClinicsLayer,
} from "@layers";

export const layers = {
  clinics: {
    key: "clinics",
    isChecked: false,
    zoom: 8,
    label: "מרפאות",
    component: () => <ClinicsLayer />,
  },
  postOffices: {
    key: "postOffices",
    isChecked: false,
    zoom: 8,
    label: "משרדי דואר",
    component: () => <PostOfficesLayer />,
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
