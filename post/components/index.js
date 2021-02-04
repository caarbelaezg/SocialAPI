const express = require("express");
const bodyParser = require("body-parser");

const config = require("../config");
const post = require("./components/post/post-network");
const errors = require("../network/errors");

const app = express();

//Routes
app.use(bodyParser.json());

app.use("/api/post", post);
app.use(errors)


app.listen(config.post.port, () => {
  console.log("Servicio post escuchando en el puerto: " + config.post.port);
});
