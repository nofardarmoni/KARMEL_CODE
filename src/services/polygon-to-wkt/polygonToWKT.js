export const polygonToWKT = (polygon) =>
  polygon && `POLYGON ((${reversePoints(polygon).join(",")}))`;

export const multiPolygonToWKT = (multiPolygon) =>
  multiPolygon &&
  `MULTIPOLYGON (${multiPolygon.map(
    (polygon) =>
      `((${polygon.map((points) => reversePoints(points)).join(",")}))`
  )})`;

const reversePoints = (points) =>
  points.map((point) =>
    point
      .slice()
      .reverse()
      .join(" ")
  );
