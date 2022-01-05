import React, { useMemo, useRef } from "react";
import { GraphFrame, VerticalBarChart } from "@core";
import {
  calculateTotalPopulation,
  deepCompareMemo,
  isPrecise,
  numberWithCommas,
} from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import { dataName } from "@constants";

function parseAges(populationData) {
  return [
    {
      age: "0-14",
      count:
        populationData["age_0_4"] +
        populationData["age_5_9"] +
        populationData["age_10_14"],
    },
    {
      age: "15-29",
      count:
        populationData["age_15_19"] +
        populationData["age_20_24"] +
        populationData["age_25_29"],
    },
    {
      age: "30-44",
      count:
        populationData["age_30_34"] +
        populationData["age_35_39"] +
        populationData["age_40_44"],
    },
    {
      age: "45-59",
      count:
        populationData["age_45_49"] +
        populationData["age_50_54"] +
        populationData["age_55_59"],
    },
    {
      age: "60-74",
      count:
        populationData["age_60_64"] +
        populationData["age_65_69"] +
        populationData["age_70_74"],
    },
    {
      age: "75+",
      count:
        populationData["age_75_79"] +
        populationData["age_80_84"] +
        populationData["age_85_up"],
    },
  ];
}

function PopulationCard({ event }) {
  const dataCache = useRef({});

  const { data } = useApiQuery({
    dataPath: `layers/${dataName}`,
    label: "אוכלוסיה",
    fetchOnce: true,
    body: {
      polygon: event.polygon,
      isPrecise: isPrecise(event),
    },
    options: {
      placeholderData: dataCache.current,
      onSuccess: (data) => (dataCache.current = data),
    },
  });

  const { ageData, totalCount } = useMemo(() => {
    return {
      ageData: parseAges(data ?? {}),
      totalCount: calculateTotalPopulation(data ?? {}),
    };
  }, [data]);

  return (
    <GraphFrame
      title={`פילוח גילאים - ${numberWithCommas(totalCount)} תושבים`}
      hideGraph={!totalCount}
      alternativeDesc={"אין נתונים על תושבים באיזור"}
    >
      <VerticalBarChart total={totalCount} data={ageData} />
    </GraphFrame>
  );
}

export default deepCompareMemo(PopulationCard);
