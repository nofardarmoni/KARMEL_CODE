var config = require("./dbconfig");
const sql = require("mssql");

export async function getWaterStations() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query("SELECT * from WaterStations");
    return data.recordsets;
  } catch (error) {
    console.log(error);
  }
}
