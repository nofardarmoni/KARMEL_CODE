import React, { /*useEffect,*/ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
// import { fetchData, putData, REQUEST_METHODS } from "@services/api-service";
import { IconButton, Tab, Tabs } from "@material-ui/core";
import { useSetRecoilState } from "recoil";
import { slaTableFlagState } from "@states/slaTableState";
import { useMap } from "react-leaflet";
import { /*Message,*/ Table } from "@core";
import { useApiQuery } from "@hooks/useApiQuery";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    width: "45vw",
    height: "70vh",
    backgroundColor: "white",
    zIndex: 1000,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
    borderRadius: 20,
    filter: "drop-shadow(0px 5px 10px)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  tableTitle: {
    paddingTop: 10,
    fontFamily: "AlmoniBold",
    fontSize: 30,
  },
  tab: {
    fontFamily: "AlmoniBold",
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const columns = {
  priority: {
    label: "אתר הצופר / הבקר התקול",
  },
  isSirenRule: {
    label: "תקלת צופר / בקר",
  },
  isRegular: {
    label: "תקלה רגילה / משביתה",
  },
  hours: {
    isEditable: true,
    label: "זמן הביצוע / מדד הביצוע המקסימלי",
  },
};

const tabs = {
  regular: {
    label: "מצב רגיעה",
  },
  emergency: {
    label: "מצב חירום",
  },
};

const [regularCondition, emergencyCondition, emergencyColumn] = [
  "regular",
  "emergency",
  "isEmergency",
];

export default function SlaTable() {
  const classes = useStyles();
  const setSlaTableFlag = useSetRecoilState(slaTableFlagState);
  const [tabValue, setTabValue] = useState(regularCondition);
  const map = useMap();

  const setSLAs = () => {};

  const { data } = useApiQuery({
    dataPath: "sirens/sla-rules",
    label: "טבלת SLA",
    fetchOnce: true,
  });

  const putSLAs = () => {};

  const displayData = (data, column) => {
    switch (column) {
      case "priority":
        return `אזור עדיפות ${data}`;
      case "isSirenRule":
        return data ? "תקלת צופר" : "תקלת בקר";
      case "isRegular":
        return data ? "תקלה רגילה" : "תקלה משביתה";
      case "hours":
        return `תיקון התקלה תוך ${data} שעות`;
      default:
        return;
    }
  };

  const handleClose = () => {
    setSlaTableFlag(false);
    handleMouseLeave();
  };

  const handleMouseEnter = () => {
    map.scrollWheelZoom.disable();
  };

  const handleMouseLeave = () => {
    map.scrollWheelZoom.enable();
  };

  const toggleTab = (_, newValue) => {
    setTabValue(newValue);
  };

  const isDisplayed = (SLA) => {
    return (
      (tabValue === regularCondition && !SLA[emergencyColumn]) ||
      (tabValue === emergencyCondition && SLA[emergencyColumn])
    );
  };

  if (!data) return null;
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.root}
      >
        <span className={classes.tableTitle}>טבלת SLA</span>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Tabs
          value={tabValue}
          onChange={toggleTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              classes={{ root: classes.tab }}
              value={tab}
              label={tabs[tab].label}
            />
          ))}
        </Tabs>
        <Table
          rows={data}
          columns={columns}
          isDisplayed={isDisplayed}
          displayData={displayData}
          setRows={setSLAs}
          saveRows={putSLAs}
        />
      </div>
    </>
  );
}
