import React, { useEffect, useRef } from "react";
import { deepCompareMemo, polygonToWKT } from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import SirensGenericLayer from "./SirensGenericLayer";
import { maxAlertCount, minAlertCount } from "@constants";
import _ from "lodash";

function SirensLayer({ polygon, distance, status, voltage }) {
  const layerCache = useRef([]);

  const { data } = useApiQuery({
    dataPath: "sirens/get-sirens",
    label: "שכבת צופרים",
    body: {
      wktPolygon: polygon && polygonToWKT(polygon),
      distanceFromPolygon: polygon && distance,
      status: status?.value,
      voltage,
    },
    options: {
      placeholderData: layerCache.current,
      select: (data) =>
        data.map((siren) => {
          siren.alertCount = _.clamp(
            siren.alertCount,
            minAlertCount,
            maxAlertCount
          );

          return siren;
        }),
    },
  });

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;
  return <SirensGenericLayer sirens={data} />;
}

export default deepCompareMemo(SirensLayer);
