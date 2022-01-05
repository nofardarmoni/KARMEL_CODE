import React, { useEffect, useState } from "react";
import { fetchData, REQUEST_METHODS } from "@services/api-service";
import { GraphFrame, PieChart } from "@core";
import { counterService } from "@services";

const TITLE = "רגילה / משביתה";
const CURRENT_PROP = "IsRegular";

const failuresNature = [
  {
    key: "regular",
    name: "רגילה",
    amount: 0,
    color: "#EEAA00",
    [CURRENT_PROP]: true,
  },
  {
    key: "disabling",
    name: "משביתה",
    amount: 0,
    color: "#AA0000",
    [CURRENT_PROP]: false,
  },
];

export default function FailTypeNatureCard() {
  const [failData, setFailData] = useState([]);

  const fetchSirenAnomalies = () => {
    fetchData("sirenAnomalies", REQUEST_METHODS.all, "חריגות")
      .then((anomalies) =>
        counterService.addAmountToObjByProperty(
          anomalies,
          CURRENT_PROP,
          failuresNature
        )
      )
      .then(setFailData)
      .catch((error) => {
        console.log(
          error.response && error.response.status !== 404
            ? `שגיאה: ${error.response.data}`
            : "חלה שגיאה בטעינת החריגות"
        );
      });
  };

  const isHidingGraph = failData.every((entry) => entry.amount === 0);

  useEffect(fetchSirenAnomalies, []);

  return (
    <GraphFrame
      title={TITLE}
      hideGraph={isHidingGraph}
      alternativeDesc={"אין נתוני תקלות"}
    >
      <PieChart data={failData} showTooltip showLabel />
    </GraphFrame>
  );
}
