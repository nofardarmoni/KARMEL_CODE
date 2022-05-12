import express from "express";
import cors from "cors";
import router from "./routes";
var app = express();

app.use(cors()).use(express.json({ limit: "5mb" }));

app.use(router);

var server = app.listen(5000, function () {
  console.log("Server is running..");
});
