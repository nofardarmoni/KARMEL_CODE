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

function GeneralGraph({ }) {
    const classes = useStyles();
    const dataCache = useRef({});
    const mode = useRecoilValue(earthquakeState);
    const [magntideRangeState, setMagntideRangeState] = useState(null);
    const [newMagnitodeState, setNewMagnitodeState] = useRecoilState(
        magnitodeState
    );


    const [generalData, setGeneralData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/earthquakeModule/general?magnitude=${newMagnitodeState}`)
            .then((res) => setGeneralData(res.data.recordset));
    }, [newMagnitodeState]);
    console.log(newMagnitodeState);

    const dictionairy = {
        GENERAL_AKORIM: "עקורים",
        GENERAL_BINYANIM: "בניינים עם הרס כבד",
        GENERAL_HAROGIM: "הרוגים",
        GENERAL_KAL: "פצועים קל",
        GENERAL_KASHE: "פצועים קשה",
        GENERAL_LECODIM: "לכודים"
    };

    const graphData = Object.keys(generalData?.[0] ?? {}).map((key) => ({
        rashut: dictionairy[key], count: generalData?.[0][key]
    })).sort((a, b) => b.count - a.count);

    return (
        <GraphFrame
            hideGraph={graphData.length === 0 || newMagnitodeState < 4.5}
            title="נתונים כללים - אוכלוסיה"
            alternativeDesc={"אין נתונים כללים"}
        >
            <VerticalBarChart data={graphData} xAxisLabel="נזק" yAxisLabel="נפשות"  subLabel="כמות" />
        </GraphFrame>
    );
}

export default deepCompareMemo(GeneralGraph);
