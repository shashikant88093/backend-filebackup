const connection = require("../database/connection");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");

Router.post("/", (req, res) => {
  //   let today = new Date();
  //   let users = {
  //     id: req.body.id,
  //     date_time: today,
  //     password: req.body.password
  //   };
  console.log("username", req.body.old_password);
  var old_password = req.body.old_password;
  var username = req.body.username;

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results, fields) => {
      console.log("err 3", error);
      if (results.length > 0) {
        console.log("result", results);
        bcrypt.compare(old_password, results[0].password, function(err, ress) {
          if (!ress) {
            console.log("err 1", err);
            res.status(400).json({
              status: false,
              message: "password do not match"
            });
          } else {
            let new_Password = req.body.new_Password;

            bcrypt.hash(new_Password, 10, (err, hash) => {
              if (err) console.log("err 2", err);
              new_Password = hash;
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
                        message: "user password change sucessfully"
                      });
                  }
                }
              );
            });
          }
        });
      }
    }
  );
});
module.exports = Router;
