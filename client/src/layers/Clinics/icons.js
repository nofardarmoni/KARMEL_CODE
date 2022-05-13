import L from "leaflet";

const iconsUrl = "icons/layers/clinics/";

export const icons = {
  כללית: {
    "לא ידוע": L.icon({
      iconUrl: `${iconsUrl}clalit/clalit-gray.png`,
      iconSize: [25, 30],
    }),
    סגור: L.icon({
      iconUrl: `${iconsUrl}clalit/clalit-red.png`,
      iconSize: [25, 30],
    }),
    פתוח: L.icon({
      iconUrl: `${iconsUrl}clalit/clalit-green.png`,
      iconSize: [25, 30],
    }),
  },
  לאומית: {
    "לא ידוע": L.icon({
      iconUrl: `${iconsUrl}leumit/leumit-gray.png`,
      iconSize: [25, 30],
    }),
    סגור: L.icon({
      iconUrl: `${iconsUrl}leumit/leumit-red.png`,
      iconSize: [25, 30],
    }),
    פתוח: L.icon({
      iconUrl: `${iconsUrl}leumit/leumit-green.png`,
      iconSize: [25, 30],
    }),
  },
  מאוחדת: {
    "לא ידוע": L.icon({
      iconUrl: `${iconsUrl}meuhedet/meuhedet-gray.png`,
      iconSize: [25, 30],
    }),
    סגור: L.icon({
      iconUrl: `${iconsUrl}meuhedet/meuhedet-red.png`,
      iconSize: [25, 30],
    }),
    פתוח: L.icon({
      iconUrl: `${iconsUrl}meuhedet/meuhedet-green.png`,
      iconSize: [25, 30],
    }),
  },
  מכבי: {
    "לא ידוע": L.icon({
      iconUrl: `${iconsUrl}maccabi/maccabi-gray.png`,
      iconSize: [25, 30],
    }),
    סגור: L.icon({
      iconUrl: `${iconsUrl}maccabi/maccabi-red.png`,
      iconSize: [25, 30],
    }),
    פתוח: L.icon({
      iconUrl: `${iconsUrl}maccabi/maccabi-green.png`,
      iconSize: [25, 30],
    }),
  },
};
