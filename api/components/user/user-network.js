const express = require("express");

const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

//Internal functions
const list = (req, res) => {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((error) => {
      response.console.error(req, res, error.message, 500);
    });
};

const get = (req, res) => {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
};

const upsert = (req, res) => {
  controller
    .upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
};

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);

module.exports = router;
