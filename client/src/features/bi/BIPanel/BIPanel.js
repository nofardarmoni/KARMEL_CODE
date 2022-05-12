import React from "react";
import { Rnd } from "react-rnd";
import { makeStyles } from "@material-ui/core";

const SIZE_PER_ROW = 230;
const SIZE_PER_COLUMN = 265;
const DEFAULT_GRAPHS_PER_ROW = 2;

const useStyles = makeStyles(() => ({
  fullScreen: {
    position: "absolute",
    left: 10,
    right: 0,
    bottom: 10,
    top: 0,
  },
  hidden: {
    visibility: "hidden",
  },
  rndBox: {
    zIndex: 2000,
    filter: "drop-shadow(0 0 10px black)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: ({ graphsPerRow }) => `repeat(${graphsPerRow}, auto)`,
    gridTemplateRows: "auto",
    gridGap: "1%",
    padding: "1%",
    height: "96%", // TODO: bug, make height effected by "padding" and "graphsPerRow"
    border: "solid 4px black",
    borderRadius: "1%",
    background: "#352F2F",
  },
  gridItem: {
    textAlign: "center",
    fontSize: "100%",
  },
}));

const getFrameDefaultSize = (
  isSingle,
  rowsAmount,
  graphsPerRow,
  sizePerRow,
  sizePerColumn
) => [
  isSingle ? sizePerRow : sizePerRow * rowsAmount,
  isSingle ? sizePerColumn : sizePerColumn * graphsPerRow,
];

export default function BIPanel({
  isOpen,
  children,
  graphsPerRow = DEFAULT_GRAPHS_PER_ROW,
  sizePerRow = SIZE_PER_ROW,
  sizePerColumn = SIZE_PER_COLUMN,
}) {
  const classes = useStyles({ graphsPerRow });

  const rowsAmount = Math.round(children.length / graphsPerRow);
  const isSingle = !Array.isArray(children);

  const [defaultHeight, defaultWidth] = getFrameDefaultSize(
    isSingle,
    rowsAmount,
    graphsPerRow,
    sizePerRow,
    sizePerColumn
  );

  const MIN_HEIGHT = defaultHeight;
  const MIN_WIDTH = defaultWidth;
  const DEFAULT_X_COORD = window.innerWidth - defaultWidth - 30;
  const DEFAULT_Y_COORD = window.innerHeight - defaultHeight - 50;

  return (
    <div className={`${classes.fullScreen} ${!isOpen && classes.hidden}`}>
      <Rnd
        className={classes.rndBox}
        default={{
          x: DEFAULT_X_COORD,
          y: DEFAULT_Y_COORD,
          width: defaultWidth,
          height: defaultHeight,
        }}
        minWidth={MIN_WIDTH}
        minHeight={MIN_HEIGHT}
        bounds="parent"
      >
        {isSingle ? (
          children
        ) : (
          <div className={classes.grid}>
            {children.map((chart, index) => (
              <div key={index} className={classes.gridItem}>
                {chart}
              </div>
            ))}
          </div>
        )}
      </Rnd>
    </div>
  );
}
