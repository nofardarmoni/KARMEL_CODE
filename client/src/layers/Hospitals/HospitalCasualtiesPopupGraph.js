import React, { useState } from "react";
import { makeStyles, Tab, Tabs } from "@material-ui/core";
import { GraphFrame } from "@core";
import { HospitalsGenericGraph } from "@features/graphs";
import { useApiQuery } from "@hooks/useApiQuery";
import moment from "moment";
moment().format();

const POPUP_MAX_HEIGHT = 230;

const GRAPH_LAST_DAY_TAB_VALUE = "lastDay";
const GRAPH_LAST_HOUR_TAB_VALUE = "lastHour";

const useStyles = makeStyles(() => ({
  tab: {
    color: "white",
    minWidth: 50,
  },
  popup: {
    maxHeight: POPUP_MAX_HEIGHT,
  },
}));

const tabs = {
  [GRAPH_LAST_DAY_TAB_VALUE]: {
    label: "יום אחרון",
  },
  [GRAPH_LAST_HOUR_TAB_VALUE]: {
    label: "שעה אחרונה",
  },
};

const today = moment();
const yesterday = moment().subtract(1, "days");
const anHourAgo = moment().subtract(1, "hours");

const getFormattedTime = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

export default function HospitalCasualtiesPopupGraph({ hospital }) {
  const classes = useStyles();

  const [tabsValue, setTabsValue] = useState(GRAPH_LAST_DAY_TAB_VALUE);

  const { data: lastDayData } = useApiQuery({
    dataPath: `hospitals/adam/${hospital.id}`,
    label: "נקלטים בבתי חולים",
    params: {
      fromTime: getFormattedTime(yesterday),
      toTime: getFormattedTime(today),
    },
    options: {
      select: (data) => data[0],
      placeholderData: [],
    },
  });

  const { data: lastHourData } = useApiQuery({
    dataPath: `hospitals/adam/${hospital.id}`,
    label: "נקלטים בבתי חולים",
    params: {
      fromTime: getFormattedTime(anHourAgo),
      toTime: getFormattedTime(today),
    },
    options: {
      select: (data) => data[0],
      placeholderData: [],
    },
  });

  const graph = (tabValue) => {
    switch (tabValue) {
      case GRAPH_LAST_DAY_TAB_VALUE:
        return (
          <GraphFrame
            title={`פילוח נקלטים ב-24 השעות האחרונות`}
            hideGraph={!lastDayData || lastDayData.length === 0}
            alternativeDesc={"אין נתונים על נקלטים"}
          >
            <HospitalsGenericGraph absorptions={lastDayData} />
          </GraphFrame>
        );
      case GRAPH_LAST_HOUR_TAB_VALUE:
        return (
          <GraphFrame
            title={`פילוח נקלטים בשעה האחרונה`}
            hideGraph={!lastHourData || lastHourData.length === 0}
            alternativeDesc={"אין נתונים על נקלטים"}
          >
            <HospitalsGenericGraph absorptions={lastHourData} />
          </GraphFrame>
        );
      default:
        return;
    }
  };

  const handleChange = (_, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <div className={classes.popup}>
      <Tabs
        centered={true}
        value={tabsValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {Object.keys(tabs).map((tab) => (
          <Tab
            key={tab}
            value={tab}
            classes={{ root: classes.tab }}
            label={tabs[tab].label}
          />
        ))}
      </Tabs>
      {graph(tabsValue)}
    </div>
  );
}
