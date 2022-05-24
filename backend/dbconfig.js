export const sqlConfig = Object.freeze({
  user: process.env.dbUser ?? "Nofarda", // user name
  password: process.env.dbPassword ?? "333nofar", // user password
  server: process.env.dbUrl ?? "LAPTOP-47SUSM72", // server address
  database: process.env.db ?? "Karmel", // name of the data base
  trustServerCertificate: true,
});
