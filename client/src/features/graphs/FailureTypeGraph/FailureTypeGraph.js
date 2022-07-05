import React, { useState } from "react";
import { GraphFrame, PieChart } from "@core";

const TITLE = "סוגי תקלות";

export default function FailureTypeGraph() {
  const [failData] = useState([]);

  return (
    <GraphFrame
      title={TITLE}
      hideGraph={true}
      // hideGraph={isHidingGraph}
      alternativeDesc={"אין נתוני סוג תקלה"}
    >
      <PieChart data={failData} showTooltip />
    </GraphFrame>
  );
}
