import React from "react";
import {
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Text,
} from "recharts";
import { makeStyles } from "@material-ui/core";
import { numberWithCommas, percentage } from "@services";

const useTooltipStyles = makeStyles(() => ({
  tooltipContainer: {
    fontSize: 16,
    padding: 20,
    backgroundColor: "white",
    direction: "rtl",
  },
  tooltipAges: {
    fontWeight: "bold",
  },
  tooltipPercentage: {
    fontSize: 15,
  },
}));

const colors = [
  "#D5E5EC",
  "#8FBACC",
  "#4DABA8",
  "#4D8BC8",
  "#40748C",
  "#395957",
  "#23333A",
];

const CustomTooltip = (props) => {
  const tooltipClasses = useTooltipStyles();

  return (
    <div className={tooltipClasses.tooltipContainer}>
      <div className={tooltipClasses.tooltipAges}>גילאים: {props.label}</div>
      <div>כמות: {numberWithCommas(props.payload[0]?.value)} תושבים</div>
      <div className={tooltipClasses.tooltipPercentage}>
        {percentage(props.payload[0]?.value, props.total)}% מכלל האוכלוסיה
        באיזור
      </div>
    </div>
  );
};

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <Text
      x={x}
      y={y}
      width={75}
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

const VerticalBar = ({ data, total }) => {
  const bars = data.map((col, index) => {
    return { ...col, fill: colors[index] ? colors[index] : "#FFFFFF" };
  });

  return (
    <ResponsiveContainer width="95%" height="100%">
      <BarChart data={bars}>
        <XAxis
          dataKey="age"
          interval={0}
          tick={<CustomizedAxisTick />}
          height={18}
        />

        <Tooltip content={<CustomTooltip total={total} />} />
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBar;
