const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const config = require("../config");
const user = require("./components/user/user-network");
const auth = require("./components/auth/auth-network");
const { response } = require("express");
const errors = require("../network/errors");

const app = express();

//Routes
app.use(bodyParser.json());
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errors)


app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto: " + config.api.port);
});
