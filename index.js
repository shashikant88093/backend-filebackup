const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const session = require('express-session');

// db connection
// const mysqlConnectoion = require('./connection')
//routes
const FilesRoutes = require("./routes/file");
const pathRoutes = require("./routes/path");
const signinRoutes = require("./routes/signin");
const registerRoutes = require("./routes/register");
const changePassword = require("./routes/changePassword");
const sendEmail = require("./routes/email");
const resetpassword = require("./routes/resetPassword");

const { checkToken } = require("./Auth/token_validation");
var app = express();
// cors enable
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// file
app.use("/file", checkToken, FilesRoutes);
app.use("/path",checkToken, pathRoutes);
app.use("/signin", signinRoutes);
app.use("/email", sendEmail);
app.use("/resetPassword", resetpassword);
app.use("/register", registerRoutes);
app.use("/changePassword", checkToken, changePassword);
app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(8000);
