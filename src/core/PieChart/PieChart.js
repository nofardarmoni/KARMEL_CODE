import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Text,
  Tooltip,
} from "recharts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tooltipText: {
    background: "white",
    padding: 10,
    fill: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
}));

const RADIAN = Math.PI / 180;

const customLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <Text
      x={x}
      y={y}
      fill="white"
      fontWeight="bold"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      stroke={"black"}
      strokeWidth={0.5}
    >
      {`${(percent * 100).toFixed(0)}% ${name}`}
    </Text>
  );
};

const CustomTooltip = ({ payload }) => {
  const classes = useStyles();

  if (!payload || !payload[0]) return null;
  return (
    <div className={classes.tooltipText}>
      {`${payload[0].name}: ${payload[0].value}`}
    </div>
  );
};

const PieGraph = ({ data, showLabel, showTooltip }) => {
  return (
    <ResponsiveContainer width="97%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#82ca9d"
          labelLine={false}
          label={showLabel ? customLabel : false}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
