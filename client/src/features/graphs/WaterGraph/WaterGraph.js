import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { GraphFrame } from "@core";
import {
    calculateTotalPopulation,
    deepCompareMemo,
    isPrecise,
    numberWithCommas,
    polygonToWKT,
} from "@services";
import { useApiQuery } from "@hooks/useApiQuery";
import { dataName, sirensStatuses } from "@constants";
import axios from "axios";
import { statecalc } from "@layers/Water/WaterLayer";
import { useRecoilState, useRecoilValue } from "recoil";
import { earthquakeState, magnitodeState } from "@states/earthquakeState";

const useStyles = makeStyles(() => ({
    averageTimeDesc: {
        fontSize: "23px",
        fontFamily: "AlmoniBold",
        marginTop: "5%",
        color: "white",
    },
    biggerFont: {
        fontSize: "200%",
    },
}));

function WaterGraph({ event }) {
    const classes = useStyles();
    const dataCache = useRef({});
    const mode = useRecoilValue(earthquakeState);
    const [magntideRangeState, setMagntideRangeState] = useState(null);
    const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
        magnitodeState
    );
    const getMagnitodeRange = () => {
        if (newMagnitodeState >= 4.5 && newMagnitodeState <= 4.9) {
            setMagntideRangeState("MAGNITODA_4_5_4_9");
        } else if (newMagnitodeState >= 5 && newMagnitodeState <= 6.5) {
            setMagntideRangeState("MAGNITODA_5_6_5");
        } else if (newMagnitodeState >= 6.6 && newMagnitodeState <= 7) {
            setMagntideRangeState("MAGNITODA_6_6_7");
        } else if (newMagnitodeState >= 7.1 && newMagnitodeState <= 7.5) {
            setMagntideRangeState("MAGNITODA_7_1_7_5");
        } else {
            setMagntideRangeState("MAGNITODA_7_6_to_top");
        }
    };

    //   const { data: disabledVoltageSirensPolygons } = useApiQuery({
    //     dataPath: "sirens/get-sirens",
    //     label: "שכבת צופרים מושבתי מתח רשת",
    //     body: {
    //       wktPolygon: polygonToWKT(event?.polygon),
    //       status: sirensStatuses.disabled.value,
    //       voltage: true,
    //     },
    //     options: {
    //       select: (data) =>
    //         data.flatMap((siren) =>
    //           siren.coverage && siren.alertCount === 0 ? [siren.coverage] : []
    //         ),
    //     },
    //   });

    //   const polygons = [
    //     ...(disabledSirensPolygons ?? []),
    //     ...(disabledVoltageSirensPolygons ?? []),
    //   ];

    //   const { data } = useApiQuery({
    //     dataPath: `layers/${dataName}`,
    //     label: "אוכלוסייה ללא התרעה",
    //     fetchOnce: true,
    //     body: {
    //       polygon: polygons,
    //       isPrecise: isPrecise(event),
    //       isNotAlerted: true,
    //     },
    //     options: {
    //       enabled: polygons.length > 0,
    //       placeholderData: dataCache.current,
    //       onSuccess: (data) => (dataCache.current = data),
    //     },
    //   });

    //   const totalCount = useMemo(() => calculateTotalPopulation(data ?? {}), [
    //     data,
    //   ]);

    const [waterStationsData, setWaterStationsData] = useState([]);

    useEffect(() => getMagnitodeRange())

    useEffect(() => {
        axios
            .get(`http://localhost:5000/earthquakeModule/waterStations`)
            .then((res) => setWaterStationsData(res.data.recordset));
    }, []);
    console.log(waterStationsData);

    const totalCount = waterStationsData.reduce((acc, waterStation) => acc + parseInt(
        statecalc(
            mode,
            waterStation[magntideRangeState],
            waterStation.WATER_TUSHAVIM,
            waterStation.WATER_REAL_TUSHAVIM
        )
    ), 0);
    console.log(magntideRangeState);
    // const totalCount = parseInt(
    //     statecalc(
    //         mode,
    //         waterStationsData[1][magntideRangeState],
    //         waterStationsData[1].WATER_TUSHAVIM,
    //         waterStationsData[1].WATER_REAL_TUSHAVIM
    //     )
    // )

    console.log("totalCount:", totalCount);
    return (
        <GraphFrame
            hideGraph={totalCount === 0 || newMagnitodeState < 4.5}
            title="כמות אוכלוסייה ללא מים"
            alternativeDesc={"אין נתונים על אוכלוסייה ללא מים"}
        >
            <div className={classes.averageTimeDesc}>
                <span>{"כ- "}</span>
                <span className={classes.biggerFont}>
                    {numberWithCommas(totalCount)}
                </span>
                <span>{" אנשים"}</span>
            </div>
        </GraphFrame>
    );
}

export default deepCompareMemo(WaterGraph);
