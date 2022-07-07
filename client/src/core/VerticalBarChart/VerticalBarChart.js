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
import { YAxis } from "recharts";

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
  "#F3333F",
].reverse();

const CustomTooltip = (props) => {
  const tooltipClasses = useTooltipStyles();

  return (
    <div className={tooltipClasses.tooltipContainer}>
      <div className={tooltipClasses.tooltipAges}>
        {props.title}: {props.label}
      </div>
      <div>
        {props.subLabel}: {numberWithCommas(props?.payload?.[0]?.value)}{" "}
        {props.subTitle}
      </div>
      {/* <div className={tooltipClasses.tooltipPercentage}>
        {percentage(props.payload[0]?.value, props.total)}% מכלל האוכלוסיה
        באיזור
      </div> */}
    </div>
  );
};

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <Text
      x={x}
      y={y}
      width={100}
      fill="white"
      textAnchor="end"
      verticalAnchor="start"
      stroke="black"
      strokeWidth={0.5}
      angle={-45}
      fontSize={10}
      // transform={`rotate(-45)`}
    >
      {payload.value}
    </Text>
  );
};

const VerticalBar = ({
  data,
  total,
  xAxisLabel,
  yAxisLabel,
  subTitle,
  subLabel,
}) => {
  const bars = data?.map((col, index) => {
    return { ...col, fill: colors[index] ? colors[index] : "#FFFFFF" };
  });

  return (
    <ResponsiveContainer width="95%" height="100%">
      <BarChart data={bars}>
        <XAxis
          dataKey="rashut"
          interval={0}
          tick={<CustomizedAxisTick />}
          height={50}
          label={{
            value: xAxisLabel,
            position: "insideBottomRight",
            fill: "white",
            fontWeight: "bolder",
          }}
        />
        <YAxis
          label={{ value: yAxisLabel, position: "relative", fill: "white" }}
        />
        <Tooltip
          content={
            <CustomTooltip
              total={total}
              title={xAxisLabel}
              subTitle={subTitle}
              subLabel={subLabel}
            />
          }
        />
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBar;
