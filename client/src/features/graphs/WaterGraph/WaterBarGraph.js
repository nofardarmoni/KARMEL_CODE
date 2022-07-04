import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { GraphFrame, VerticalBarChart } from "@core";
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

// נצרת 
// יפיע
// אכסאל
// רינה
// עילוט
// נוף הגליל 
// מגדל העמק 
// עפולה 
// כפר כנא 
// משהד
// עין מאהל 
// טורעאן
// בועיינה נוג'ידאת 
// דבוריה
// שבלי אום אלג'נם 
// טבריה
// מגדל
// כפר כמא
// אום אל פאחם
// מעלה עירון
// בסמ"ה
// כפר קרע
// ערערה
// באקה
// ג'ת
// קריית שמונה
// מטולה
// קצרין
// עין קניא
// מג'דל שמס
// מסעדה
// בוקעתא
// יסוד המעלה
// חצור הגלילית
// טובא זנגריה
// גוש חלב
// חורפיש
// פסוטה
// פקיעין
// בית ג'אן
// ראמה
// סאג'ור
// מג'אר
// עיילבון
// צפת
// function parseData(waterData) {
//     return [
//       {
//         rashut: "נצרת",
//         count:
//           populationData["age_0_4"] +
//           populationData["age_5_9"] +
//           populationData["age_10_14"],
//       },
//       {
//         rashut: "יפיע",
//         count:
//           populationData["age_15_19"] +
//           populationData["age_20_24"] +
//           populationData["age_25_29"],
//       },
//       {
//         rashut: "אכסאל",
//         count:
//           populationData["age_30_34"] +
//           populationData["age_35_39"] +
//           populationData["age_40_44"],
//       },
//       {
//         rashut: "רינה",
//         count:
//           populationData["age_45_49"] +
//           populationData["age_50_54"] +
//           populationData["age_55_59"],
//       },
//       {
//         rashut: "עילוט",
//         count:
//           populationData["age_60_64"] +
//           populationData["age_65_69"] +
//           populationData["age_70_74"],
//       },
//       {
//         rashut: "נוף הגליל",
//         count:
//           populationData["age_75_79"] +
//           populationData["age_80_84"] +
//           populationData["age_85_up"],
//       },
//     ];
//   }

const useStyles = makeStyles(() => ({
    averageTimeDesc: {
        fontSize: "23px",
        fontFamily: "AlmoniBold",
        marginTop: "5%",
        color: "#FF3333",
    },
    biggerFont: {
        fontSize: "200%",
    },
}));

function WaterBarGraph({ }) {
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

    const [waterStationsData, setWaterStationsData] = useState([]);

    useEffect(() => {
        getMagnitodeRange();
    })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/earthquakeModule/waterStations`)
            .then((res) => setWaterStationsData(res.data.recordset));
    }, []);

    const graphData = waterStationsData.map((waterStation) => ({
        rashut: waterStation.WATER_RASHUT, count: parseInt(
            statecalc(
                mode,
                waterStation[magntideRangeState],
                waterStation.WATER_TUSHAVIM,
                waterStation.WATER_REAL_TUSHAVIM
            )
        )
    })).sort((a, b) => b.count - a.count);

    return (
        <GraphFrame
            hideGraph={graphData.length === 0 || newMagnitodeState < 4.5}
            title="פילוח כמות אוכלוסייה ללא מים"
            alternativeDesc={"אין נתונים על אוכלוסייה ללא מים"}
        >
            <VerticalBarChart data={graphData} xAxisLabel="רשות מים" yAxisLabel="נפשות" subTitle="תושבים" subLabel="כמות"   />
        </GraphFrame>
    );
}

export default deepCompareMemo(WaterBarGraph);
