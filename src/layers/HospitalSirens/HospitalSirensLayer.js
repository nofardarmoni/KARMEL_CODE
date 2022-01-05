import SirensGenericLayer from "../Sirens/SirensGenericLayer";
import React, { useEffect, useRef } from "react";
import { deepCompareMemo, polygonToWKT } from "@services";
import { useApiQueries, useApiQuery } from "@hooks/useApiQuery";

function HospitalSirensLayer({ polygon, distance }) {
  const layerCache = useRef([]);
  const { data: hospitals } = useApiQuery({
    dataPath: "layers/hospitals",
    label: "בתי חולים",
    body: polygon && {
      polygon,
      distanceFromPolygon: distance,
    },
    fetchOnce: true,
  });

  const apiQueries = hospitals
    ? hospitals.map((hospital) => ({
        dataPath: "sirens/get-sirens",
        label: `צופרי בית חולים ${hospital.name}`,
        body: {
          wktPolygon: polygonToWKT([
            [hospital.latitude, hospital.longitude],
            [hospital.latitude, hospital.longitude],
            [hospital.latitude, hospital.longitude],
            [hospital.latitude, hospital.longitude],
          ]),
          distanceFromPolygon: distance,
        },
      }))
    : [];

  const result = useApiQueries(apiQueries);
  const sirens = result
    .map((res) => res.data)
    .reduce((acc, curr) => acc.concat(curr), []);

  const data = sirens.includes(undefined)
    ? layerCache.current
    : sirens.filter(
        (siren, index) =>
          sirens.findIndex((dup) => dup.mdlc === siren.mdlc) === index
      );

  useEffect(() => {
    layerCache.current = data ?? layerCache.current;
  }, [data]);

  if (!data) return null;
  return <SirensGenericLayer sirens={data} />;
}

export default deepCompareMemo(HospitalSirensLayer);
