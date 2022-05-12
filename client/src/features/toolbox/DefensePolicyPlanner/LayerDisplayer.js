import React, { Fragment, useEffect } from "react";
import { Button } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Circle, Marker } from "react-leaflet";
import { useApiQuery } from "@hooks/useApiQuery";
import { deepCompareMemo } from "@services";
import _ from "lodash";
import { openedStatus, closedStatus, unknownStatus } from "@constants";
import { CustomPopup } from "@core";

const UNKNOWN_POLICY = "unknown";
const EXCLUDE_LABEL = "החרג";
const CANCEL_EXCLUDE_LABEL = "בטל החרגה";

const useStyles = makeStyles(() => ({
  details: {
    textAlign: "right",
    fontSize: 14,
    color: "white",
  },
  detail: {
    fontWeight: "bold",
  },
  unknownIcon: {
    filter: "contrast(200%) grayscale(100%) brightness(80%) opacity(50%)",
  },
  grayIcon: {
    filter: "contrast(200%) grayscale(100%) brightness(80%)",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  buttonStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#fdd835",
    },
  },
});

const isButtonDisplayed = (data) => {
  return data.icon.options.className ?? data.excluded;
};

function getButtonLabel(data) {
  if (data.excluded) return CANCEL_EXCLUDE_LABEL;
  return EXCLUDE_LABEL;
}

function LayerDisplayer({
  layer,
  selectedLayers,
  setSelectedLayers,
  defensePolicies,
  currentDefensePolicy,
  currentPolygonId,
  polygonsLayer,
}) {
  const classes = useStyles();

  const excludeLayers = (index) => {
    setSelectedLayers((oldState) => {
      const newData = _.cloneDeep(oldState);
      const newDatum = newData[layer.key].data[index];
      newDatum.excluded = !newDatum.excluded;
      return newData;
    });
  };

  const getIcon = (data) => {
    const icon = _.cloneDeep(
      layer.mapIcons[data[layer.companyField] ?? "default"]
    );
    data.defensePolicyStatus = openedStatus;
    if (!data.excluded) {
      if (
        layer.defensePolicyTranslator[data[layer.defensePolicyField]] ===
        UNKNOWN_POLICY
      ) {
        icon.options.className = classes.unknownIcon;
        data.defensePolicyStatus = unknownStatus;
      } else if (
        defensePolicies[currentDefensePolicy]?.value >
        defensePolicies[
          layer.defensePolicyTranslator[data[layer.defensePolicyField]]
        ]?.value
      ) {
        icon.options.className = classes.grayIcon;
        data.defensePolicyStatus = closedStatus;
      }
    }

    data.icon = icon;

    return icon;
  };

  const { data: layerData } = useApiQuery({
    dataPath: layer.path,
    label: layer.label,
    fetchOnce: true,
    params: {
      polygonsLayer: polygonsLayer,
      polygonId: currentPolygonId,
    },
  });

  useEffect(() => {
    if (layerData) {
      setSelectedLayers((oldState) => {
        const newData = _.cloneDeep(oldState);
        newData[layer.key].data = layerData.map((datum) => {
          datum.excluded = false;
          return datum;
        });
        return newData;
      });
    }
  }, [layerData, layer.key, setSelectedLayers]);

  if (!selectedLayers[layer.key].data) return null;

  return (
    <>
      {selectedLayers[layer.key].data.map((datum, index) => (
        <Fragment key={index}>
          <Circle
            color="#FFE48B"
            center={[datum.latitude, datum.longitude]}
            radius={500}
            pathOptions={{
              fillOpacity: datum.excluded ? 0.5 : 0,
              opacity: datum.excluded ? 1 : 0,
            }}
          />
          <Marker
            position={[datum.latitude, datum.longitude]}
            icon={getIcon(datum)}
          >
            <CustomPopup>
              {Object.keys(layer.parser).map(
                (detail) =>
                  layer.parser[detail] &&
                  datum[detail] !== null && (
                    <div key={detail} className={classes.details}>
                      <span className={classes.detail}>
                        {`${layer.parser[detail]}: `}
                      </span>
                      <span>{datum[detail]}</span>
                    </div>
                  )
              )}
              {isButtonDisplayed(datum) && (
                <div className={classes.button}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.buttonStyle}
                      onClick={() => excludeLayers(index)}
                    >
                      {getButtonLabel(datum)}
                    </Button>
                  </ThemeProvider>
                </div>
              )}
            </CustomPopup>
          </Marker>
        </Fragment>
      ))}
    </>
  );
}

export default deepCompareMemo(LayerDisplayer);
