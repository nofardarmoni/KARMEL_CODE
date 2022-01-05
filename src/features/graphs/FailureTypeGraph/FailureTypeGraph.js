import React, { useState } from "react";
// import React, { useEffect, useState } from "react";
// import { fetchData, REQUEST_METHODS } from "@services/api-service";
import { GraphFrame, PieChart } from "@core";
// import { sirenFailures as failures } from "@constants";
// import { counterService } from "@services";

const TITLE = "סוגי תקלות";

// const colors = [
//   "#B09bce",
//   "#A07Ace",
//   "#809bce",
//   "#95b8d1",
//   "#b8e0d2",
//   "#d6eadf",
//   "#eac4d5",
// ];

export default function FailureTypeGraph() {
  const [failData,] = useState([]);
  // const [failData, setFailData] = useState([]);

  // const fetchSirenAnomalies = () => {
  //   fetchData("sirenAnomalies", REQUEST_METHODS.all, "חריגות")
  //     .then(parseAnomalies)
  //     .then(setFailData)
  //     .catch((error) => {
  //       console.log(
  //         error.response && error.response.status !== 404
  //           ? `שגיאה: ${error.response.data}`
  //           : "חלה שגיאה בטעינת החריגות"
  //       );
  //     });
  // };

  // const parseAnomalies = (anomalies) => {
  //   const failuresCount = counterService.countByProperty(
  //     anomalies,
  //     "FailureTypeName"
  //   );

  //   const parsedFailcount = Object.entries(failuresCount).map(
  //     ([key, value], index) => {
  //       return {
  //         key,
  //         name: failures[key] ? failures[key] : "אחר",
  //         amount: value,
  //         color: colors[index],
  //       };
  //     }
  //   );

  //   return parsedFailcount;
  // };

  // const isHidingGraph = failData.every((entry) => entry.amount === 0);

  // useEffect(fetchSirenAnomalies, []);

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
