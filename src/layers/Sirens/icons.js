import L from "leaflet";

const iconsUrl = "icons/layers/sirens";

export const icons = {
  1: L.icon({
    iconUrl: `${iconsUrl}/green-siren/green-siren.png`,
    iconSize: [30, 30],
  }),
  2: L.icon({
    iconUrl: `${iconsUrl}/orange-siren/orange-siren.png`,
    iconSize: [30, 30],
  }),
  3: L.icon({
    iconUrl: `${iconsUrl}/red-siren/red-siren.png`,
    iconSize: [30, 30],
  }),
  4: L.icon({
    iconUrl: `${iconsUrl}/black-siren/black-siren.png`,
    iconSize: [30, 30],
  }),
  5: L.icon({
    iconUrl: `${iconsUrl}/black-siren/black-siren-electricity.png`,
    iconSize: [30, 43],
  }),
  default: L.icon({
    iconUrl: `${iconsUrl}/green-siren/green-siren.png`,
    iconSize: [30, 30],
  }),
};
