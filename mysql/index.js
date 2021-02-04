const express = require("express");

const bodyParser = require("body-parser");

const config = require("../config");
const router = require("./mysql-network");

const app = express();

app.use(bodyParser.json());

//ROUTES
app.use("/", router);

app.listen(config.mysqlService.port, () => {
  console.log(
    "Servicio de MySql escuchando en el puerto: ",
    config.mysqlService.port
  );
});
