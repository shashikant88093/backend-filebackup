const connection = require('../database/connection');
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');


Router.post('/', (req, res,next) => {
    let today = new Date();
    let users = {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password,
        "date_time": today
    }
    var user = users;
    console.log(req.body.password)
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) console.log(err);
        user.password = hash;
        connection.query('INSERT INTO users  SET ?', users,
         (error, results, fields) => {
            if (error) {
                console.log(error);
                
                res.status(404).json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                console.log(results),
                res.json({
                    status: true,
                  data:results,
                    message: 'user registered sucessfully'
                })
    
    
            }
        }
        )
    
    })
    })
   
module.exports = Router;