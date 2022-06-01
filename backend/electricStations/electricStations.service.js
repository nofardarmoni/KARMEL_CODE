import { sqlConfig } from "../dbconfig";
import sql from "mssql";

export async function getElectricStations(req, res) {
  sql.connect(sqlConfig, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    request.query("select * from ELEC_LAYER", function (err, recordset) {
      if (err) console.log(err);

      res.send(recordset);
    });
  });
}
