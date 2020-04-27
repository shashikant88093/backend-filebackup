const connection = require("../database/connection");
const nodemailer = require("nodemailer");
const express = require("express");
const Router = express.Router();

Router.post("/", (req, res) => {

  let { username, email } = req.body;
  if (email === "") {
    res.status(400).send("email requird");
  } else {
    connection.query(
      "SELECT email from users where username = ?",
      [username,email],
      (error, results, fields) => {
        if (error) {
          res.json({
            status: false,
            message: "there are some error with query"
          });
        }
        if(results.length >0){
            if (email === "" || email === null) {
                res.json({
                  status: false,
                  message: "No email exist"
                });
              } else {
                async function main() {
                // let testAccount = await nodemailer.createTestAccount();

                  //smtp credentails
                  const  transporter = nodemailer.createTransport({
                      host:"mail.stackuptech.com",
                      port:465,
                      secure:false,
                      auth:{
                          user:'shashikant.k@stackuptech.com',
                          pass:'chandan@88093'
                      }
                  });
                  let info = await transporter.sendMail({
                    from:"shashikant.k@stackuptech.com",
                    to:email,
                    subject:'Reset Password',
                    text:'Please reset your pasword',
                    html:'<h1>hello</h1>'
//now checkit
                  })
                  console.log("Message sent: %s", info.messageId);
                  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            }
            main().catch(console.error);
          }
        }
          
      }
    );
  }
});

module.exports = Router;
