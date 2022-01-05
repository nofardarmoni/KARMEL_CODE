import { useMapEvents } from "react-leaflet";

export default function MapLocationSaver() {
  const mapBind = useMapEvents({
    moveend() {
      localStorage.setItem(
        "center",
        JSON.stringify([mapBind.getCenter().lat, mapBind.getCenter().lng])
      );
    },
    zoomend() {
      localStorage.setItem("zoom", mapBind.getZoom());
    },
  });

  return null;
}
