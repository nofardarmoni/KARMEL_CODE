import React, { Fragment } from "react";
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ChevronLeft, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    position: "absolute",
    backgroundColor: "#191919",
    top: 100,
    left: 90,
    width: 230,
    borderRadius: 5,
    color: "white",
    paddingTop: 5,
    paddingRight: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "AlmoniBold",
    fontSize: 17,
  },
  checkbox: {
    marginTop: 5,
    marginBottom: 5,
  },
  treeCheckbox: {
    marginTop: 5,
  },
  tree: {
    marginTop: -30,
    marginBottom: 15,
  },
  subTrees: {
    paddingTop: 10,
    paddingRight: 25,
  },
}));

const StyledCheckbox = withStyles({
  root: {
    color: "white",
  },
})((props) => <Checkbox color="primary" {...props} />);

export default function GraphPicker() {
  const classes = useStyles();
  const updateCheckbox = (layerName, value) => {
    setLayers((prev) => {
      // const clone = _.cloneDeep(prev);
      // clone[layerName].isChecked = value;
      // return clone;
      return {
        ...prev,
        [layerName]: { ...prev[layerName], isChecked: value },
      };
    });
  };

  const updateRadiobuttons = (layerName) => {
    Object.keys(layers).forEach((layerKey) => {
      if (layers[layerKey].isRadioChecked !== undefined) {
        if (layerKey === layerName) {
          setLayers((prev) => {
            return {
              ...prev,
              [layerKey]: {
                ...prev[layerKey],
                isRadioChecked: true,
              },
            };
          });
        } else {
          setLayers((prev) => {
            return {
              ...prev,
              [layerKey]: { ...prev[layerKey], isRadioChecked: false },
            };
          });
        }
      }
    });
  };

  const updateType = (layerName, typeName, value) => {
    setLayers((prev) => {
      // const clone = _.cloneDeep(prev);
      // clone[layerName].types[typeName].isChecked = value;
      // return clone;
      return {
        ...prev,
        [layerName]: {
          ...prev[layerName],
          types: {
            ...prev[layerName].types,
            [typeName]: {
              ...prev[layerName].types[typeName],
              isChecked: value,
            },
          },
        },
      };
    });
  };

  const updateTypes = (layerName, value) => {
    const types = layers[layerName].types;

    Object.keys(types).forEach((typeKey) => {
      setLayers((prev) => {
        return {
          ...prev,
          [layerName]: {
            ...prev[layerName],
            types: {
              ...prev[layerName].types,
              [typeKey]: {
                ...prev[layerName].types[typeKey],
                isChecked: value,
              },
            },
          },
        };
      });
    });
  };

  const handleMainLayer = (layerName, typeName, value) => {
    const types = layers[layerName].types;
    const typesStatus = Object.keys(types).map((typeKey) =>
      typeKey === typeName ? value : types[typeKey].isChecked
    );
    const isAllChecked = typesStatus.every((typeStatus) => typeStatus);

    updateCheckbox(layerName, isAllChecked);
  };

  const handleCheckbox = (event, layerName) => {
    const { name, checked } = event.target;

    updateType(layerName, name, checked);
    handleMainLayer(layerName, name, checked);
  };

  const handleChange = (event) => {
    const { name, checked, type } = event.target;

    switch (type) {
      case "checkbox":
        updateCheckbox(name, checked);
        layers[name].types && updateTypes(name, checked);
        break;
      case "radio":
        updateRadiobuttons(name);
        break;
      default:
        break;
    }
  };

  const getIsChecked = (layerName) => {
    const types = layers[layerName].types;
    const typesStatus = Object.keys(types).map(
      (typeKey) => types[typeKey].isChecked
    );
    const isAllChecked = typesStatus.every((typeStatus) => typeStatus);

    return isAllChecked;
  };

  const getIsIndeterminate = (layerName) => {
    const types = layers[layerName].types;
    const typesStatus = Object.keys(types).map(
      (typeKey) => types[typeKey].isChecked
    );
    const isAllChecked = typesStatus.every((typeStatus) => typeStatus);
    const isAllUnChecked = typesStatus.every((typeStatus) => !typeStatus);

    return !isAllChecked && !isAllUnChecked;
  };

  const getCheckedCount = (layerName) => {
    const types = layers[layerName].types;
    const typesStatus = Object.keys(types).map(
      (typeKey) => types[typeKey].isChecked
    );
    const checkedCount = typesStatus.filter((typeStatus) => typeStatus).length;

    return checkedCount;
  };

  return (
    <div className={classes.root + " shadow"}>
      
    </div>
  );
}
