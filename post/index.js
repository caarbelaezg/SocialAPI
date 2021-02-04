const express = require("express");
const bodyParser = require("body-parser");

const config = require("../config");
const post = require("./components/post/post-network");
const { response } = require("express");
const errors = require("../network/errors");

const app = express();

//Routes
app.use(bodyParser.json());

app.use("/api/post", post);
app.use(errors)


app.listen(config.post.port, () => {
  console.log("Api escuchando en el puerto: " + config.post.port);
});
