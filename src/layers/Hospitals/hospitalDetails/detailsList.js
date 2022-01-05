import moment from "moment";

export const hospitalDetailsList = {
  address: { label: "כתובת" },
  district: { label: "מחוז" },
  isRadiationTreatmentAvailable: {
    label: "טיפול בנפגעי קרינה",
    parser: (value) => (value ? "כן" : "לא"),
  },
  multipleCasualtiesCapability: { label: 'יכולת טיפול באר"ן' },
  cbrneCasualtiesCapability: { label: 'יכולת טיפול באירוע חל"כ' },
  occupancyUpdateTime: {
    label: "זמן עדכון תפוסה",
    parser: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
  },
  hospitalLevel: { label: "Level" },
  operationRooms: { label: "חדרי ניתוח" },
  alternativeLanding: { label: "מנחת חלופי" },
  isCbrneSiteExists: {
    label: 'הימצאות אתר טיהור חל"כ',
    parser: (value) => (value ? "כן" : "לא"),
  },
  isCbrneTreatmentAvailable: {
    label: 'טיפול בנפגעי חל"כ',
    parser: (value) => (value ? "כן" : "לא"),
  },
  isRadiologic: {
    label: "מותאם למתאר רדיולוגי",
    parser: (value) => (value ? "כן" : "לא"),
  },
  isLandingAvailable: {
    label: "כשירות מנחת",
    parser: (value) => (value ? "כשיר" : "לא כשיר"),
  },
  isOutsideErAvailable: {
    label: "פריסת מיון חיצוני",
    parser: (value) => (value ? "כן" : "לא"),
  },
  isPurificationSiteAvailable: { label: 'תקינות אתר טיהור אט"ה' },
  isCbrneSiteAvailable: { label: 'תקינות אתר טיהור חל"כ' },
};
