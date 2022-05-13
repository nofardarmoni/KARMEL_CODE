import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepCompareMemo } from "@services";
import { openedStatus, closedStatus, unknownStatus } from "@constants";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import colorsGraph from "./colorsGraph.json";

const TITLE = "פילוח שירותים לפי עמידה במדיניות";

const useStyles = makeStyles({
  root: {
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: "center",
    border: "5px solid black",
    borderRadius: 10,
    direction: "ltr",
  },
  title: {
    color: "white",
    fontFamily: "AlmoniBold",
    fontSize: 20,
  },
  graph: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function DefensePolicySelectorGraph({ selectedLayers, currentDefensePolicy }) {
  const classes = useStyles();
  const [dataTable, setDataTable] = useState({});

  useEffect(() => {
    const newData = {};
    Object.values(selectedLayers).forEach((layer) => {
      let excluded = 0;
      let opened = 0;
      let closed = 0;
      let unknown = 0;

      layer.data?.forEach((datum) => {
        if (datum.excluded) excluded++;
        switch (datum.defensePolicyStatus) {
          case openedStatus:
            opened++;
            break;
          case closedStatus:
            closed++;
            break;
          case unknownStatus:
            unknown++;
            break;
          default:
            break;
        }
      });

      opened = opened - excluded;

      newData[layer.key] = {
        name: layer.label,
        excluded,
        closed,
        unknown,
        opened,
      };

      setDataTable(newData);
    });
  }, [selectedLayers, currentDefensePolicy]);

  return (
    <>
      <div className={classes.root}>
        <span className={classes.title}>{TITLE}</span>
        <div className={classes.graph}>
          <BarChart data={Object.values(dataTable)} width={430} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip
              labelStyle={{ fontSize: 18, fontWeight: "bold" }}
              contentStyle={{ fontSize: 14, fontWeight: "bold" }}
            />

            <Legend align="center" iconType="circle" verticalAlign="bottom" />

            {Object.keys(colorsGraph).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId={colorsGraph[key].stackId}
                fill={colorsGraph[key].fill}
                name={colorsGraph[key].name}
                label={{ fill: "white", fontWeight: "bold" }}
              />
            ))}
          </BarChart>
        </div>
      </div>
    </>
  );
}

export default deepCompareMemo(DefensePolicySelectorGraph);
