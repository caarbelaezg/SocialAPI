const express = require("express");

const response = require("../network/response");
const store = require("../store/mysql");

const router = express.Router();

const list = async (req, res, next) => {
  const datos = await store.list(req.params.table);
  response.success(req, res, datos, 200);
};
const get = async (req, res, next) => {
  const datos = await store.get(req.params.table, req.params.id);
  response.success(req, res, datos, 200);
};
const insert = async (req, res, next) => {
  const datos = await store.insert(req.params.table, req.body);
  response.success(req, res, datos, 200);
};
const upsert = async (req, res, next) => {
  const datos = await store.upsert(req.params.table, req.body);
  response.success(req, res, datos, 200);
};

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.put("/:table", upsert);

module.exports = router;
