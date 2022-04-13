const express = require('express')
const app = express()
const sql = require("mssql");


app.get('/', (req, res) => {
  const data = execute()

  res.send(data)
})
// config for your database
const config = {
    user: 'Nofarda',
    password: '333nofar',
    server: 'LAPTOP-47SUSM72',
    database: 'Earthquake',
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
};

// async/await style
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();

pool1.on('error', err => {
  console.log(err);
})

const sqlQuery = "select * from Water";

async function getWaters() {
  // ensure pool has been created
  await pool1Connect;

  try
  {
    const request = pool1.request();
    const result = await request.query(sqlQuery);

    return result.recordset;
  }
  catch (err)
  {
    console.error('SQL Error', err);
  }
}

async function execute()
{
  return await getWaters();
}

app.listen(5000, () => {
    console.log('Server is runnig on port 5000')
})

