import { sqlConfig } from "../dbconfig";
import sql from "mssql";

export async function getWaterStations(req,res) {
  sql.connect(sqlConfig, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    request.query("select * from WaterStations", function (err, recordset) {
      if (err) console.log(err);

      res.send(recordset);
    });
  });
}
