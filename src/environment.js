export const env = process.env.REACT_APP_ISLOCAL ? "local" : process.env.NODE_ENV ?? "development";

const serverUrl = env === "local" ? "localhost:3001" : "karmel44-dev.azurewebsites.net";

const schemaSuffix = env === "local" ? "" : "s";

export const apiUrl = `http${schemaSuffix}://${serverUrl}/api/`;

export const ellipseSocketUrl = `ws${schemaSuffix}://${serverUrl}/ellipses`;
export const alertedAreasSocketUrl = `ws${schemaSuffix}://${serverUrl}/alerts`;
