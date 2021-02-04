const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

//Internal functions
const list = (req, res, next) => {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
};

const get = (req, res, next) => {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

const upsert = (req, res, next) => {
  controller
    .upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
};

const follow = (req, res, next) => {
  controller
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      console.log(err);
    });
};

const following = (req, res, next) => {
  return controller
    .following(req.params.id)
    .then((data) => {
      return response.success(req, res, data, 200);
    })
    .catch(next);
};

//Routes
router.get("/", list);
router.post("/follow/:id", secure("follow"), follow);
router.post("/:id/following", following);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
