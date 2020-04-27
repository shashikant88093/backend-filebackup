const express = require('express');
const fs = require("fs");

const Router = express.Router();


Router.post("/", (req, res) => {
    console.log("req.body.path")
    req.header("Content-Type", "text/html");
    console.log(req.body.path)
    fs.readFile(req.body.path, 'utf8', (err, data) => {
        if (!err) {
        res.status(200).send(data)
            
        }else{
            console.error(err)
            res.status(400).send(data)
        }
    })

})




module.exports = Router;