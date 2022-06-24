import L from "leaflet";

const iconsUrl = "icons/layers/waters";

export const icons = {
  'blue-water-icon': L.icon({
    iconUrl: `${iconsUrl}/blue-water-drop.png`,
    iconSize: [30, 40],
  }),
  'red-water-icon': L.icon({
    iconUrl: `${iconsUrl}/red-water-drop.jpeg`,
    iconSize: [30, 40],
  }),
  'orange-water-icon': L.icon({
    iconUrl: `${iconsUrl}/orange-water-drop.jpeg`,
    iconSize: [30, 40],
  }),
};