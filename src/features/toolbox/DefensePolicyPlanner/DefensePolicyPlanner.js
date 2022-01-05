import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { deepCompareMemo } from "@services";
import { maxBounds } from "@constants";
import SelectorCard from "./SelectorCard";
import LayersSelector from "./LayersSelector";
import DefensePolicySelector from "./DefensePolicySelector";
import DefensePolicySelectorGraph from "./DefensePolicySelectorGraph";
import LayerDisplayer from "./LayerDisplayer";
import { defaultPolicy, defensePolicies } from "./defensePolicies";
import PolygonsSelector from "./PolygonsSelector";
import DefensePolicyTitle from "./DefensePolicyTitle";
import { useApiQuery } from "@hooks/useApiQuery";
import defaultPolygonsOptions from "./defaultPolygonsOptions.json";
import defaultPolygonsLayers from "./defaultPolygonsLayers.json";
import _ from "lodash";

const DEBOUNCE_TIME = 300;

const filterPolygonsOptions = (polygonsLayers) =>
  defaultPolygonsOptions.filter(
    (polygonOptions) => polygonsLayers[polygonOptions.layer]
  );

function DefensePolicyPlanner({ defensePolicyOptions, setDefensePolicyFlag }) {
  const {
    layers,
    polygonsLayers = defaultPolygonsLayers,
  } = defensePolicyOptions;
  const polygonsCache = useRef([]);
  const [selectorCardFlag, setSelectorCardFlag] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(null);
  const [selectedLayers, setSelectedLayers] = useState({});
  const [defensePolicySelectorFlag, setDefensePolicySelectorFlag] = useState(
    false
  );
  const [currentDefensePolicy, setCurrentDefensePolicy] = useState(
    defaultPolicy
  );
  const [polygonsLayerId, setPolygonsLayerId] = useState(0);
  const setDebouncedPolygonsLayerId = _.debounce(
    setPolygonsLayerId,
    DEBOUNCE_TIME
  );
  const polygonsOptions = filterPolygonsOptions(polygonsLayers);
  const chosenPolygonOptions = polygonsOptions[polygonsLayerId];

  const map = useMap();

  const { data: polygons } = useApiQuery({
    dataPath: `layers/${chosenPolygonOptions.layer}`,
    label: chosenPolygonOptions.label,
    fetchOnce: true,
    options: {
      placeholderData: polygonsCache.current,
      onSuccess: (data) => (polygonsCache.current = data),
    },
  });

  useEffect(() => {
    map.flyToBounds(maxBounds);
  }, [map]);

  useEffect(() => {
    setDefensePolicyFlag(true);

    return () => {
      setDefensePolicyFlag(false);
    };
  }, [setDefensePolicyFlag]);

  return (
    <>
      <DefensePolicyTitle
        currentPolygon={currentPolygon}
        polygonOptions={chosenPolygonOptions}
        polygonsLayersLength={polygonsOptions.length}
        setDefensePolicyFlag={setDefensePolicyFlag}
        setPolygonsLayerId={setDebouncedPolygonsLayerId}
      />
      <PolygonsSelector
        polygonOptions={chosenPolygonOptions}
        polygons={polygons}
        selectorCardFlag={selectorCardFlag}
        setDefensePolicyFlag={setDefensePolicyFlag}
        setSelectorCardFlag={setSelectorCardFlag}
        currentPolygon={currentPolygon}
        setCurrentPolygon={setCurrentPolygon}
      />
      {selectorCardFlag && (
        <SelectorCard
          layers={layers}
          setSelectedLayers={setSelectedLayers}
          setCurrentPolygon={setCurrentPolygon}
          setSelectorCardFlag={setSelectorCardFlag}
          setDefensePolicySelectorFlag={setDefensePolicySelectorFlag}
          setCurrentDefensePolicy={setCurrentDefensePolicy}
        >
          <LayersSelector
            layers={layers}
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            setDefensePolicySelectorFlag={setDefensePolicySelectorFlag}
            setCurrentDefensePolicy={setCurrentDefensePolicy}
          />
          {defensePolicySelectorFlag && (
            <DefensePolicySelector
              defensePolicies={defensePolicies}
              currentDefensePolicy={currentDefensePolicy}
              setCurrentDefensePolicy={setCurrentDefensePolicy}
            />
          )}
          {defensePolicySelectorFlag &&
            !defensePolicies[currentDefensePolicy].isHidden && (
              <DefensePolicySelectorGraph
                selectedLayers={selectedLayers}
                currentDefensePolicy={currentDefensePolicy}
              />
            )}
        </SelectorCard>
      )}

      {defensePolicySelectorFlag &&
        !defensePolicies[currentDefensePolicy].isHidden &&
        Object.values(selectedLayers).map((layer, index) => (
          <LayerDisplayer
            key={index}
            layer={layer}
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            defensePolicies={defensePolicies}
            currentDefensePolicy={currentDefensePolicy}
            currentPolygonId={currentPolygon[chosenPolygonOptions.idField]}
            polygonsLayer={chosenPolygonOptions.layer}
          />
        ))}
    </>
  );
}

export default deepCompareMemo(DefensePolicyPlanner);
