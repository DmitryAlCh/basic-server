var express = require("express");
var router = express.Router();
const { readFile } = require("../db/crud");

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("dataReady:", req.query.dataReady);
  alreadyChecked = readFile("checked");
  results = readFile("results");
  Promise.all([alreadyChecked, results])
    .then(values => {
      res.render("index", {
        title: "Wappalyzer POC",
        domains: JSON.parse(values[0]),
        domainResults: JSON.parse(values[1])
      });
    })
    .catch(e => {
      console.log(e);
      res.render("index", {
        title: "Wappalyzer POC",
        domains: [],
        domainResults: []
      });
    });
  // res.render("index", { title: "Wappalyzer POC", data: data });
});

module.exports = router;
