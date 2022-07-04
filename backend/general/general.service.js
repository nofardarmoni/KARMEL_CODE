import { sqlConfig } from "../dbconfig";
import sql from "mssql";

export async function getGeneral(req, res) {
  const { magnitude } = req.query;

  sql.connect(sqlConfig, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    request.query(`select * from GENERAL_LAYER where GENERAL_MAGNITODA = ${magnitude}`, function (err, recordset) {
      if (err) console.log(err);

      res.send(recordset);
    });
  });
}
