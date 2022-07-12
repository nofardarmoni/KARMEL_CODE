import L from "leaflet";

const iconsUrl = "icons/layers/waters";

export const icons = {
  'blue-water-drop': L.icon({
    iconUrl: `${iconsUrl}/blue-water-drop.png`,
    iconSize: [50, 60],
  }),
  'red-water-drop': L.icon({
    iconUrl: `${iconsUrl}/red-water-drop.png`,
    iconSize: [50, 60],
  }),
  'orange-water-drop': L.icon({
    iconUrl: `${iconsUrl}/orange-water-drop.png`,
    iconSize: [50, 60],
  }),
  'default': L.icon({
    iconUrl: "icons/marker.svg",
    iconSize: [30, 30],
  }),
};