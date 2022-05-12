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
  nursingHomes: {
    key: "nursingHomes",
    icon: `${iconsUrl}nursing-homes/nursing-homes.png`,
    defensePolicyField: "defense_policy",
    defensePolicyTranslator: {
      "ביניים 1": "medium1",
      "ביניים 2": "medium2",
      מחמירה: "severe",
      "ללא מגבלות": "shelter",
    },
    mapIcons: {
      default: L.icon({
        iconUrl: `${iconsUrl}nursing-homes/nursing-homes.png`,
        iconSize: [25, 25],
      }),
    },
    label: "מוסדות סיעודיים",
    path: "layers/nursinghomes",
    parser: {
      mosad_name: "שם מוסד",
      address: "כתובת",
      phone: "טלפון",
      Protective: "זמן כניסה למקלט",
      defense_policy: "מדיניות התגוננות",
    },
  },

  dialysisCenters: {
    key: "dialysisCenters",
    icon: `${iconsUrl}dialysis-centers/dialysis-centers.png`,
    defensePolicyField: "defense_policy",
    defensePolicyTranslator: {
      "ביניים 1": "medium1",
      "ביניים 2": "medium2",
      מחמירה: "severe",
      "ללא מגבלות": "shelter",
    },
    mapIcons: {
      default: L.icon({
        iconUrl: `${iconsUrl}dialysis-centers/dialysis-centers.png`,
        iconSize: [25, 25],
      }),
    },
    label: "מכוני דיאליזה",
    path: "layers/dialysisinstitutes",
    parser: {
      InstituteNAME: "שם",
      MunicipalNAME: "עיר",
      Street_Name: "כתובת",
      Phone: "טלפון",
    },
  },
  mentalHealthCenters: {
    key: "mentalHealthCenters",
    icon: `${iconsUrl}mental-health/mental-health.png`,
    defensePolicyField: "",
    companyField: "",
    defensePolicyTranslator: {},
    mapIcons: {},
    label: "בריאות הנפש",
    path: "layers/banks",
    parser: {},
    isDisabled: true,
  },
};
