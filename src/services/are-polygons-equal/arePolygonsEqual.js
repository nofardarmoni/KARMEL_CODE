
export default function arePolygonsEqual(firstPolygon = [], secondPolygon = []) {
  return (
    firstPolygon.length === secondPolygon.length &&
    firstPolygon.every((coordinates, coordinatesIndex) =>
      coordinates.every(
        (coordinate, coordinateIndex) =>
          coordinate === secondPolygon[coordinatesIndex][coordinateIndex]
      )
    )
  );
}
