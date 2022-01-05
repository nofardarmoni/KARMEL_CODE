import React from "react";
import { GraphFrame } from "@core";
import { HospitalsGenericGraph } from "@features/graphs";
import { useApiQuery } from "@hooks/useApiQuery";
import { useEnv } from "@hooks/useEnv";
import moment from "moment";
moment().format();

const today = moment();
const yesterday = moment().subtract(1, "days");

function TimeSinceWar() {
  const data = useEnv();
  return moment(data?.warClockStartTime ?? 0, ["MM/DD/YYYY HH:mm", "s"]);
}

const getFormattedTime = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

export default function HospitalsGraph({ isSinceWar }) {
  const { data } = useApiQuery({
    dataPath: "hospitals/adam",
    label: "נקלטים בבתי חולים",
    params: {
      fromTime: getFormattedTime(isSinceWar ? TimeSinceWar() : yesterday),
      toTime: getFormattedTime(today),
    },
    options: { select: (data) => data[0], placeholderData: [] },
  });

  return (
    <GraphFrame
      title={`פילוח נקלטים ארצי במלר"ד ${
        isSinceWar ? "מתחילת הלחימה" :  "ביממה האחרונה"
      }`}
      hideGraph={!data || data.length === 0}
      alternativeDesc={"אין נתונים על נקלטים"}
    >
      <HospitalsGenericGraph absorptions={data} />
    </GraphFrame>
  );
}
