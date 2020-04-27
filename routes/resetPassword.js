const connection = require("../database/connection");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");

Router.put('/',(req,res)=>{
    let {password,username}= req.body
    connection.query("SELECT * FROM users WHERE username = ?",[username],(error,results,fields)=>{
        console.log("err 1",error);
        if(results.length  > 0){
            console.log("results",results);
let new_Password = req.body.new_Password;
bcrypt.hash(new_Password,10,(err,hash)=>{
    if(err) console.log("err 2",err);
    new_password = hash
    connection.query(
        "UPDATE users SET password = ? where username = ?",
        [new_Password, username],
        (error, results, fields) => {
          if (error) {
            console.log(error);

            res.json({
              status: false,
              message: "there are some error with query"
            });
          } else {
            console.log("result", results),
              res.status(200).json({
                status: true,
                data: results,
                message: "user password update  sucessfully"
              });
          }
        }
      )
        }
    )}

})
})
  
module.exports = Router;