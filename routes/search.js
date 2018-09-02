var express = require("express");
var router = express.Router();

const { addDataToFile } = require("../db/crud");
const { getTech } = require("../wapalyzer/wrapper");

/* GET home page. */
router.post("/", function(req, res, next) {
  console.log(req.body.url);
  if (req.body.url) {
    res.status(200);
    let p1 = addDataToFile("checked", { domain: req.body.url });
    let p2 = getTech(req.body.url);
    Promise.all([p1, p2])
      .then(values => {
        console.log("data saved to file:", values[0]);
        console.log(values[1]);
        addDataToFile("results", JSON.stringify(values[1])).catch(e => {
          console.log("unable to save results to results file");
        });
        res.redirect("/");
      })
      .catch(e => {
        console.log(e);
        res.redirect("/");
      });
  }
  // res.redirect("/");
});

module.exports = router;
