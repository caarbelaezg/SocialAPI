const express = require("express");

const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();


const list = () =>{
    controller.list().then(data=>{
        response.success(req,res,data,200)
    }).catch(next)
}



router.get("/", list)

module.exports = router