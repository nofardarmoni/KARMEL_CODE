import React, { useEffect, useState } from "react";
import { fetchData, REQUEST_METHODS } from "@services/api-service";
import { GraphFrame, PieChart } from "@core";
import { counterService } from "@services";

const TITLE = "תקלות לפי חברה";
const CURRENT_PROP = "IsSirenFailure";

const failuresNature = [
  {
    key: "Alpam/Shamrad",
    name: "אלפם/שמרד",
    amount: 0,
    color: "#0000BB",
    [CURRENT_PROP]: true,
  },
  {
    key: "motorola",
    name: "מוטורולה",
    amount: 0,
    color: "#00BB00",
    [CURRENT_PROP]: false,
  },
];

export default function FailIsSirenCard() {
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
