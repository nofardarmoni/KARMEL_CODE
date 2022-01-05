import React, { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";
import { GraphFrame } from "@core";
import { sirensStatuses } from "@constants";
import districts from "./districts.json";
import "./SirensActivityGraph.css";
import { useApiQuery } from "@hooks/useApiQuery";

const TOP_GRAPH_LABEL = sirensStatuses.disabled.label;

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <Text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      verticalAnchor="start"
      stroke="black"
      strokeWidth={0.5}
    >
      {payload.value}
    </Text>
  );
};

const filterSirens = (sirens) => {
  const sirensByDistrictAndStatus = {};

  Object.keys(districts).forEach((district) => {
    sirensByDistrictAndStatus[district] = {};
    Object.keys(sirensStatuses).forEach((status) => {
      sirensByDistrictAndStatus[district][status] = sirens.filter(
        (siren) =>
          siren.districtCode === districts[district] &&
          siren.status === sirensStatuses[status].value
      );
    });
  });

  const filteredSirens = Object.keys(sirensByDistrictAndStatus).map(
    (district) => {
      const obj = { name: district };

      Object.keys(sirensStatuses).forEach((status) => {
        obj[status] = sirensByDistrictAndStatus[district][status].length;
      });

      return obj;
    }
  );

  return filteredSirens;
};

function SirensActivityGraph() {
  const { data: filteredSirens } = useApiQuery({
    dataPath: "sirens/sirens",
    label: "גרף צופרים",
    options: { select: filterSirens },
  });

  const getLabelStyle = (label) => {
    if (label === TOP_GRAPH_LABEL) {
      return { position: "top", fill: "white" };
    }

    return null;
  };

  return (
    <GraphFrame
      title={"פילוח צופרים לפי מחוזות"}
      hideGraph={!filteredSirens || filteredSirens.length === 0}
      alternativeDesc={"אין נתונים על צופרים"}
    >
      <ResponsiveContainer width="95%" height="100%">
        <BarChart width={600} height={300} data={filteredSirens}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={<CustomizedAxisTick />}
            height={18}
            stroke="#8884d8"
          />
          <YAxis />
          <Tooltip
            wrapperStyle={{ backgroundColor: "#ccc" }}
            labelStyle={{ fontSize: 18, fontWeight: "bold" }}
            contentStyle={{ fontSize: 14 }}
            formatter={(value, name) => [value, sirensStatuses[name]?.label]}
          />
          <Legend formatter={(name) => sirensStatuses[name]?.label} />
          {Object.keys(sirensStatuses).map((key) => (
            <Bar
              key={key}
              label={getLabelStyle(sirensStatuses[key]?.label)}
              dataKey={key}
              stackId={1}
              fill={sirensStatuses[key]?.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </GraphFrame>
  );
}

export default memo(SirensActivityGraph);
