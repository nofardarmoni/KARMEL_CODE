import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Text,
} from "recharts";
import levels from "./injuryLevels.json";
import colors from "./colors.json";
import "./HospitalsGenericGraph.css";

const TOP_GRAPH_LABEL = "אזרחים";

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

const filterAbsorptions = (absorptions) => {
  if (!absorptions) return [];

  const filteredAbsorptions = Object.keys(levels).map((level) => {
    const obj = { name: level };

    Object.keys(levels[level]).forEach((subLevel) => {
      obj[subLevel] = absorptions[levels[level][subLevel]];
    });

    return obj;
  });

  return filteredAbsorptions;
};

export default function HospitalsGenericGraph({ absorptions }) {
  const [data, setData] = useState([]);

  const getLabelStyle = (label) => {
    if (label === TOP_GRAPH_LABEL) {
      return { position: "top", fill: "white" };
    }

    return null;
  };

  useEffect(() => setData(filterAbsorptions(absorptions)), [absorptions]);

  return (
    <ResponsiveContainer
      width="95%"
      height="100%"
      minHeight="150px"
      minWidth="100px"
    >
      <BarChart data={data}>
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
        />
        <Legend />
        {Object.keys(colors).map((key) => (
          <Bar
            key={key}
            label={getLabelStyle(key)}
            dataKey={key}
            stackId={1}
            fill={colors[key]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
