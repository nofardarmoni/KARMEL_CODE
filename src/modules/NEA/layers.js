import React from "react";
import { DistrictsLayer, SubDistrictsLayer, TrafficLayer } from "@layers";

export const layers = {
  traffic: {
    key: "traffic",
    isChecked: false,
    label: "עומסי תנועה",
    component: () => <TrafficLayer />,
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
