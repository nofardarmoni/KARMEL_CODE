import React, { memo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";
import { makeStyles } from "@material-ui/core/styles";
import "./MovilimGraph.css";
import {
  sderotGraphData,
  movilimGraphData,
  movilimGraphDrilldownData,
} from "./graphsData";
import _ from "lodash";

drilldown(Highcharts);

const useStyles = makeStyles(() => ({
  graphContainer: {
    position: "absolute",
    width: "70vw",
    height: "60vh",
    backgroundColor: "#313131",
    zIndex: 1000,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
    borderRadius: 20,
    filter: "drop-shadow(0px 5px 10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minWidth: "max-content",
    minHeight: "max-content",
  },
}));

const sderotGraphTitle = "גרף שדרות היסע";
const sderotGraphTooltipFormat =
  "{series.name}: <b>{point.percentage:.1f}%</b>";
const sderotGraphDataLabelFormat =
  "<b>{point.name}</b>: {point.percentage:.1f}%";

const movilimGraphTitle = "גרף אורחות";
const movilimGraphSubTitle = "לחץ בשביל לראות גרף מובילים של אותה אורחה";
// const movilimGraphDataLabel =
//   "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>";
const movilimGraphDrilldownTooltipFormat = "מובילים: 165,312,412,5342";

function MovilimGraph() {
  const classes = useStyles();
  const [secondGraph, setSecondGraph] = useState(null);
  const [secondGraphDisplayer, setSecondGraphDisplayer] = useState(false);

  const sderotOptions = {
    chart: {
      backgroundColor: "#313131",
      style: {
        fontFamily: "'Unica One', sans-serif",
      },
      plotBorderColor: "#606063",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: sderotGraphTitle,
      style: {
        color: "#E0E0E3",
        fontSize: "20px",
      },
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      style: {
        color: "#E0E0E3",
      },
    },
    tooltip: {
      pointFormat: sderotGraphTooltipFormat,
      useHTML: true,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      style: {
        color: "#F0F0F0",
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        events: {
          click: (e) => {
            setSecondGraph(movilimOptions);
            setSecondGraphDisplayer(!e.point.options.selected);
            // e.point.options.selected reversed because of problem of delay in state of the component, when selected it returns false and not true and vice versa
          },
        },
      },
      series: {
        dataLabels: {
          enabled: true,
          format: sderotGraphDataLabelFormat,
          useHTML: true,
          color: "#F0F0F3",
          style: {
            fontSize: "14px",
          },
        },
        marker: {
          lineColor: "#333",
        },
      },
      boxplot: {
        fillColor: "#505053",
      },
      candlestick: {
        lineColor: "white",
      },
      errorbar: {
        color: "white",
      },
    },
    series: _.cloneDeep(sderotGraphData),
  };

  const movilimOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#313131",
      style: {
        fontFamily: "'Unica One', sans-serif",
      },
      plotBorderColor: "#606063",
    },
    title: {
      text: movilimGraphTitle,
      style: {
        color: "#E0E0E3",
        fontSize: "20px",
      },
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: movilimGraphSubTitle,
      style: {
        color: "#E0E0E3",
        textTransform: "uppercase",
      },
    },

    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },

    plotOptions: {
      series: {
        dataLabels: {
          useHTML: true,
          color: "#F0F0F3",
          style: {
            fontSize: "14px",
          },
        },
        marker: {
          lineColor: "#333",
        },
      },

      boxplot: {
        fillColor: "#505053",
      },
      candlestick: {
        lineColor: "white",
      },
      errorbar: {
        color: "white",
      },
    },

    tooltip: {
      formatter: function(a) {
        let checkDrilldowned = a.chart.ddDupes?.length;

        return checkDrilldowned
          ? movilimGraphDrilldownTooltipFormat
          : `מספר מובילים: ${
              a.chart.series[0].processedYData[this.point.index]
            }`;
      },
      useHTML: true,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      style: {
        color: "#F0F0F0",
      },
    },

    series: movilimGraphData,
    drilldown: {
      series: movilimGraphDrilldownData,
    },
  };

  return (
    <div className={classes.graphContainer}>
      <HighchartsReact highcharts={Highcharts} options={sderotOptions} />
      {secondGraphDisplayer && (
        <HighchartsReact highcharts={Highcharts} options={secondGraph} />
      )}
    </div>
  );
}

export default memo(MovilimGraph);
