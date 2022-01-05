import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "./SearchGeocoder.css";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

export default function SearchGeocoder() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let geocoder = L.Control.Geocoder.nominatim({
      geocodingQueryParams: {
        "accept-language": "he",
      },
    });
    if (typeof URLSearchParams !== "undefined") {
      const params = new URLSearchParams();
      const geocoderString = params.get("geocoder");
      if (L.Control.Geocoder?.[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }
    let marker = null;

    L.Control.geocoder({
      query: "",
      placeholder: "חפש מיקום או כתובת",
      defaultMarkGeocode: false,
      errorMessage: "לא נמצאה תוצאה מתאימה",
      geocoder,
    })
      .on("markgeocode", (e) => {
        if (marker) map.removeLayer(marker);
        const latlng = e.geocode.center;
        marker = L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);

  return null;
}
