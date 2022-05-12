import L from "leaflet";

const iconsUrl = "icons/layers/forces/";

const policeCarIcon = L.icon({
  iconUrl: `${iconsUrl}police/police_car.png`,
  iconSize: [30, 20],
});

const fireTruckIcon = L.icon({
  iconUrl: `${iconsUrl}kaba/kaba.png`,
  iconSize: [40, 40],
});

const ambulanceIcon = L.icon({
  iconUrl: `${iconsUrl}mada/ambulance.png`,
  iconSize: [40, 30],
});

export const icons = {
  police: {
    ניידת: policeCarIcon,
    מסוק: L.icon({
      iconUrl: `${iconsUrl}police/police_helicopter.png`,
      iconSize: [30, 20],
    }),
    אופנוע: L.icon({
      iconUrl: `${iconsUrl}police/police_motorcycle.png`,
      iconSize: [30, 20],
    }),
    default: policeCarIcon,
  },
  mada: {
    "אמבולנס רגיל": ambulanceIcon,
    מסוק: L.icon({
      iconUrl: `${iconsUrl}mada/helicopter.png`,
      iconSize: [40, 30],
    }),
    אופנוע: ambulanceIcon,
    אחר: ambulanceIcon,
    'נט"ן': ambulanceIcon,
    רגיל: ambulanceIcon,
    "רכב פרטי": ambulanceIcon,
    "חפק מחוזי": ambulanceIcon,
    "חפק ארצי": ambulanceIcon,
    "אמבולנס טיפול נמרץ": ambulanceIcon,
    בימבולנס: ambulanceIcon,
    טרקטורון: ambulanceIcon,
    'תאר"ן': ambulanceIcon,
    default: ambulanceIcon,
  },
  kaba: {
    אביר: fireTruckIcon,
    אופנוע: fireTruckIcon,
    אלון: fireTruckIcon,
    "אלון צבאי": fireTruckIcon,
    אשד: fireTruckIcon,
    אלמוג: fireTruckIcon,
    ברק: fireTruckIcon,
    געש: fireTruckIcon,
    דקל: fireTruckIcon,
    וולקן: fireTruckIcon,
    כללי: fireTruckIcon,
    נשר: fireTruckIcon,
    נץ: fireTruckIcon,
    סנפיר: fireTruckIcon,
    סער: fireTruckIcon,
    סלע: fireTruckIcon,
    קיסר: fireTruckIcon,
    רותם: fireTruckIcon,
    default: fireTruckIcon,
  },
  unitedHatzalah: {
    default: L.icon({
      iconUrl: `${iconsUrl}united-hatzalah/united-hatzalah.png`,
      iconSize: [40, 40],
    }),
  },
  default: L.icon({
    iconUrl: `${iconsUrl}default-force.png`,
    iconSize: [30, 30],
  }),
};
