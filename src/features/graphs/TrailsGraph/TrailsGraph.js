import React, { memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import { useMap } from "react-leaflet";

const COLOR_INDEX = 2;
const LINE_COLOR_INDEX = 0;
const ELEVATION_INDEX = 2;

function TrailsGraph({
  coordinates,
  title,
  description,
  xAxisTitle,
  yAxisTitle,
}) {
  const map = useMap();

  let sumDistance = 0;
  const elevationData = coordinates.map((trail, index, trails) => {
    sumDistance += index === 0 ? 0 : map.distance(trails[index - 1], trail);

    return [sumDistance, trail[ELEVATION_INDEX]];
  });

  const graphStructure = {
    chart: {
      type: "area",
      zoomType: "x",
      panning: true,
      panKey: "shift",
      scrollablePlotArea: {
        minWidth: 600,
      },
      backgroundColor: "#313131",
      style: {
        color: "#E0E0E3",
      },
    },

    caption: {
      text: description,
      useHTML: true,
      style: {
        color: "#E0E0E3",
        fontSize: 10,
        direction: "rtl",
        textAlign: "right",
        right: 0,
      },
    },

    title: {
      text: title,
      style: {
        color: "#E0E0E3",
        fontFamily: "'Unica One', sans-serif",
        fontSize: "20px",
        direction: "rtl",
        textAlign: "center",
        right: 0,
      },
      useHTML: true,
    },

    accessibility: {
      description:
        "This line chart uses the Highcharts Annotations feature to place labels at various points of interest. The labels are responsive and will be hidden to avoid overlap on small screens. Image description: An annotated line chart illustrates the 8th stage of the 2017 Tour de France cycling race from the start point in Dole to the finish line at Station des Rousses. Altitude is plotted on the Y-axis, and distance is plotted on the X-axis. The line graph is interactive, and the user can trace the altitude level along the stage. The graph is shaded below the data line to visualize the mountainous altitudes encountered on the 187.5-kilometre stage. The three largest climbs are highlighted at Col de la Joux, Côte de Viry and the final 11.7-kilometer, 6.4% gradient climb to Montée de la Combe de Laisia Les Molunes which peaks at 1200 meters above sea level. The stage passes through the villages of Arbois, Montrond, Bonlieu, Chassal and Saint-Claude along the route.",
      landmarkVerbosity: "one",
    },

    lang: {
      accessibility: {
        screenReaderSection: {
          annotations: {
            descriptionNoPoints:
              "{annotationText}, at distance {annotation.options.point.x}km, elevation {annotation.options.point.y} meters.",
          },
        },
      },
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      labels: {
        format: "{value} m",
        style: {
          color: "#E0E0E3",
          fontSize: 10,
        },
      },
      minRange: 0.1,
      title: {
        text: xAxisTitle,
        style: {
          color: "#E0E0E3",
        },
      },
      accessibility: {
        rangeDescription: "Range: 0 to 187.8km.",
      },
    },

    yAxis: {
      startOnTick: true,
      endOnTick: false,
      maxPadding: 0.35,
      title: {
        text: yAxisTitle,
        style: {
          color: "#E0E0E3",
        },
      },
      labels: {
        format: "{value} m",
        style: {
          color: "#E0E0E3",
          fontSize: 10,
        },
      },
      accessibility: {
        description: "Elevation",
        rangeDescription: "Range: 0 to 1,553 meters",
      },
    },

    tooltip: {
      headerFormat: "מרחק: {point.x:.1f}m<br>",
      pointFormat: "גובה: {point.y}m",
      shared: true,
      useHTML: true,
      style: {
        direction: "rtl",
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        data: elevationData,
        lineColor: Highcharts.getOptions().colors[LINE_COLOR_INDEX],
        color: Highcharts.getOptions().colors[COLOR_INDEX],
        fillOpacity: 0.5,
        name: "Elevation",
        marker: {
          enabled: false,
        },
        threshold: null,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={graphStructure} />;
}

export default memo(TrailsGraph);
