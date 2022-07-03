import L from "leaflet";

const iconsUrl = "icons/layers/Electric";

export const icons = {
  'lightning-green': L.icon({
    iconUrl: `${iconsUrl}/lightning-green.png`,
    iconSize: [30, 40],
  }),
  'lightning-red': L.icon({
    iconUrl: `${iconsUrl}/lightning-red.png`,
    iconSize: [30, 40],
  }),
  'lightning-yellow': L.icon({
    iconUrl: `${iconsUrl}/lightning-yellow.png`,
    iconSize: [30, 40],
  }),
};