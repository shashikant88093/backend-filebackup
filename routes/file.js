const express = require("express");
const Router = express.Router();

const sequelize = require("../database/connection");

Router.get("/", (req, res) => {
  let queries = Object.entries(req.query);
  let queryStr = null;
  if (queries.length > 0) {
    queryStr = "where ";
    if (req.query.startDate)
      queryStr += "Date_time >= '" + req.query.startDate + "' and ";
    if (req.query.endDate)
      queryStr += "Date_time <= '" + req.query.endDate + "' and ";
    if (req.query.status)
      queryStr += "Run_status = '" + req.query.status + "' and ";
  }

  if (queryStr) {
    queryLs = queryStr.split(" and ");
    queryStr = queryLs.splice(0, queryLs.length - 1).join(" and ");
  }

  sequelize.query(
    "SELECT * from test " + (queryStr ? queryStr : "limit 10"),
    (err, rows, fields) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
