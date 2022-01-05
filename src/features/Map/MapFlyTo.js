import { useMap } from "react-leaflet";
import { maxBounds } from "@constants";

export default function MapFlyTo() {
  const map = useMap();

  map.flyToBounds(maxBounds);

  return null;
}
