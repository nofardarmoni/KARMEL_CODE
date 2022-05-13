export const sqlConfig = Object.freeze({
  user: process.env.dbUser ?? "ronit_local", // user name
  password: process.env.dbPassword ?? "ronit_local", // user password
  server: process.env.dbUrl ?? "localhost", // server address
  database: process.env.db ?? "tryout", // name of the data base
  trustServerCertificate: true,
});
