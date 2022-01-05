import { useRef } from "react";
import { Popup } from "react-leaflet";
import { useRecoilValue } from "recoil";
import { distanceMeasurementFlagState } from "@states/toolboxState";

const CustomPopup = (props) => {
  const leafletRef = useRef();
  const openPopupFlag = useRecoilValue(distanceMeasurementFlagState);

  return !openPopupFlag && <Popup ref={leafletRef} {...props} />;
};

export default CustomPopup;