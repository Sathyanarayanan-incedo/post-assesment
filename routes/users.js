var express = require('express');
var fs = require('fs');
var {parse} = require('csv-parse')
var app = express();

app.get("/students" , async( req , res) => {
      const data = await readDataFromCSV('./data/Student_grades.csv');
      res.send(data);
})

app.get("/studentssortByAge"  ,async( req ,res) => {
    const data = await readDataFromCSV('./data/Student_grades.csv');
    data.sort(compareAgeAndSort);
    res.send(data);
})

app.get("/calculatestudentAvg" , async( req ,res) => {
    const data = await readDataFromCSV( './data/Student_grades.csv' )
    var length = data.length;
    const totalGrades = data.reduce((sum, student) => sum + parseInt(student.Grade), 0);
    var av =totalGrades/parseInt(length);
    res.send(`Average is ${av}`);
})




function compareAgeAndSort(stud1 , stud2){
    if( stud1.Age<stud2.Age) return -1;
    if( stud1.Age>stud2.Age) return 1;
    else  return 0;
}


function readDataFromCSV(filePath )
{
    return new Promise( (resolve , reject) => {
    fs.readFile( filePath , ( err , data) => {
           parse( data  , { columns:true} , ( err , rows) => {
           resolve( rows);
     })
        })

    })

}

  
module.exports = router;
