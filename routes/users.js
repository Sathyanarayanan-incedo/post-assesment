const express = require('express');
var router = express.Router();
var fs = require("fs");
//const csvParser = require('csv-parser');

const filepath = "./data/Student_grades.csv"

router.get("/", (req, res) => {
    res.json({ message: "Welcome to Students database !!!" });
  });


  router.get("/Studentgrades", (req, res) => {
    fs.readFile("./data/Student_grades.json", (err, data) => {
      var buf = Buffer.from(data);
      res.send({ Students: JSON.parse(buf.toString()) });
    });
  });
  
module.exports = router;
