import L from "leaflet";

const iconsUrl = "icons/layers/";

export const defensePolicyLayers = {
  clinics: {
    key: "clinics",
    icon: `${iconsUrl}clinics/clinic.png`,
    defensePolicyField: "defense_policy",
    companyField: "Healthcare_Company",
    defensePolicyTranslator: {
      "לא ידוע": "unknown",
      "לא קיים במימד": "unknown",
      מקלה: "easy",
      "ביניים 1": "medium1",
      "ביניים 2": "medium2",
      מחמירה: "severe",
      "פעילות מתוך מרחב מוגן": "shelter",
    },
    mapIcons: {
      default: L.icon({
        iconUrl: `${iconsUrl}clinics/clinic.png`,
        iconSize: [25, 30],
      }),
      כללית: L.icon({
        iconUrl: `${iconsUrl}clinics/clalit/clalit-green.png`,
        iconSize: [25, 30],
      }),
      לאומית: L.icon({
        iconUrl: `${iconsUrl}clinics/leumit/leumit-green.png`,
        iconSize: [25, 30],
      }),
      מכבי: L.icon({
        iconUrl: `${iconsUrl}clinics/maccabi/maccabi-green.png`,
        iconSize: [25, 30],
      }),
      מאוחדת: L.icon({
        iconUrl: `${iconsUrl}clinics/meuhedet/meuhedet-green.png`,
        iconSize: [25, 30],
      }),
    },
    label: "מרפאות",
    path: "layers/emergencyclinics",
    parser: {
      Clinic_NAME: "שם",
      Street_Name: "רחוב",
      house_num: "בית",
      Phone1: "טלפון",
      Healthcare_Company: "קופת חולים",
      defense_policy: "מדיניות התגוננות",
      Clinic_Status: "סטטוס",
    },
  },
  postOffices: {
    key: "postOffices",
    icon: `${iconsUrl}post-offices/post-office.png`,
    defensePolicyField: "defense_policy",
    defensePolicyTranslator: {
      לא: "unknown",
      סגורה: "unknown",
      "???": "unknown",
      מקלה: "easy",
      "ביינים 1": "medium1",
      "ביינים 2": "medium2",
      "ביניים 1": "medium1",
      "בינים 1": "medium1",
      מחמירה: "severe",
      "פעילות מתוך מרחב מוגן": "shelter",
    },
    mapIcons: {
      default: L.icon({
        iconUrl: `${iconsUrl}post-offices/post-office-position.png`,
        iconSize: [25, 30],
      }),
    },
    label: "משרדי דואר",
    path: "layers/postOffices",
    parser: {
      name: "שם",
      address: "כתובת",
      alert_time: "זמן כניסה למקלט",
      defense_policy: "מדיניות התגוננות",
    },
  },
  groceries: {
    key: "groceries",
    icon: `${iconsUrl}groceries/grocery.png`,
    defensePolicyField: "",
    companyField: "",
    defensePolicyTranslator: {},
    mapIcons: {},
    label: "רשתות שיווק",
    path: "layers/groceries",
    parser: {},
    isDisabled: true,
  },
  banks: {
    key: "banks",
    icon: `${iconsUrl}banks/bank.png`,
    defensePolicyField: "",
    companyField: "",
    defensePolicyTranslator: {},
    mapIcons: {},
    label: "בנקים",
    path: "layers/banks",
    parser: {},
    isDisabled: true,
  },
};
