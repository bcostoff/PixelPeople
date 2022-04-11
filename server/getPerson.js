
const express = require("express");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "rsgdevtest",
    user: "root",
    password: "rsgP@ssw0rdroot",
    database: 'pxlppl'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// {
//     "id": "1",
//     "numLetters": "15"
//   }
// var http = require('http');
  
// var app = http.createServer(function(req,res){
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify({ id:"1", numLetters:"15"}));
// });
  
// app.listen(8000);



const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});