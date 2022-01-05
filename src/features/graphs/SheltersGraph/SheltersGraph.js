import React, { useEffect, useState } from "react";
import { GraphFrame, PieChart } from "@core";

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

const defaultData = [
  {
    name: "בעלי מיגון",
    amount: 1,
    range: [350, 800],
    color: "#00C49F",
  },
  {
    name: "חסרי מיגון",
    amount: 1,
    range: [10, 100],
    color: "red",
  },
];

export default function SheltersGraph() {
  const [data, setData] = useState(defaultData);

  const randomizeData = () => {
    defaultData.map((entry) => {
      entry.amount = randomNumber(...entry.range);

      return entry;
    });

    setData(defaultData);
  };

  useEffect(randomizeData, []);

  return (
    <GraphFrame
      title={`מיגון - מקלטים`}
      // hideGraph={data.every((entry) => entry.amount === 0)}
      hideGraph={true}
      alternativeDesc={"אין נתונים על מיגון באיזור"}
    >
      <PieChart data={data} showLabel />
    </GraphFrame>
  );
}
