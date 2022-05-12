import L from "leaflet";

const iconsUrl = "icons/layers/waters";

export const icons = {
  'waterIcon': L.icon({
    iconUrl: `${iconsUrl}/water-drop.png`,
    iconSize: [25, 30],
  }),
};
