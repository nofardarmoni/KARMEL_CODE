import React, { useState } from "react";
import { makeStyles, Tab, Tabs } from "@material-ui/core";
import HospitalDetails from "./HospitalDetails";
import HospitalCasualtiesPopupGraph from "./HospitalCasualtiesPopupGraph";
import HospitalBeds from "./HospitalBeds";
import { Hotel, Phone, ShowChart, Subject } from "@material-ui/icons";
import { hospitalDetailsList } from "./hospitalDetails/detailsList";
import { hospitalPhonesList } from "./hospitalDetails/phonesList";
import { CustomPopup } from "@core";

const DETAILS_TAB_VALUE = "details";
const GRAPH_TAB_VALUE = "graph";
const PHONES_TAB_VALUE = "phones";
const BEDS_TAB_VALUE = "beds";

const POPUP_MIN_HEIGHT = 330;
const POPUP_MIN_WIDTH = 450;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    borderRadius: 5,
    textAlign: "center",
    color: "white",
    paddingTop: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontWeight: "bold",
  },
  popup: {
    minHeight: POPUP_MIN_HEIGHT,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "AlmoniBold",
    color: "white",
  },
  tabs: {
    marginBottom: 10,
    alignSelf: "center",
  },
  tab: {
    color: "white",
    marginBottom: -5,
    minWidth: 50,
  },
}));

const tabs = {
  [GRAPH_TAB_VALUE]: {
    icon: <ShowChart fontSize="small" />,
    label: 'גרף נקלטים במלר"ד',
  },
  [DETAILS_TAB_VALUE]: {
    icon: <Subject fontSize="small" />,
    label: "פרטי בית חולים",
  },
  [PHONES_TAB_VALUE]: {
    icon: <Phone fontSize="small" />,
    label: "פרטי טלפון",
  },
  [BEDS_TAB_VALUE]: {
    icon: <Hotel fontSize="small" />,
    label: "פרטי מיטות",
  },
};

export default function HospitalPopup({ hospital }) {
  const classes = useStyles();
  const [tabsValue, setTabsValue] = useState(GRAPH_TAB_VALUE);

  const renderTabComponent = (tabValue, props) => {
    switch (tabValue) {
      case DETAILS_TAB_VALUE:
        return (
          <HospitalDetails
            hospital={props}
            hospitalDetails={hospitalDetailsList}
          />
        );
      case GRAPH_TAB_VALUE:
        return <HospitalCasualtiesPopupGraph hospital={props} />;
      case PHONES_TAB_VALUE:
        return (
          <HospitalDetails
            hospital={props}
            hospitalDetails={hospitalPhonesList}
          />
        );
      case BEDS_TAB_VALUE:
        return <HospitalBeds hospital={props} />;
      default:
        return;
    }
  };

  const handleChange = (_, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <CustomPopup minWidth={POPUP_MIN_WIDTH}>
      <div className={classes.popup}>
        <div className={classes.title}>בית חולים {hospital.name}</div>
        <Tabs
          classes={{ root: classes.tabs }}
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
              classes={{ root: classes.tab }}
              value={tab}
              icon={tabs[tab].icon}
            />
          ))}
        </Tabs>

        {renderTabComponent(tabsValue, hospital)}
      </div>
    </CustomPopup>
  );
}
