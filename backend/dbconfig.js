export const sqlConfig = Object.freeze({
  user: process.env.dbUser ?? "ronit_local",
  password: process.env.dbPassword ?? "ronit_local",
  server: process.env.dbUrl ?? "localhost",
  database: process.env.db ?? "tryout",
  trustServerCertificate: true,
});
