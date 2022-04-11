// server/index.js
const path = require('path');
const express = require('express');
var mysql = require('mysql');
var fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/person", (req, res) => {
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        var setArray = r.name.split(' ');
        var set1 = setArray[0].length;
        var set2 = setArray[1].length;
        res.json({ id: r.id, set1: set1, set2: set2, hint: r.hint });
    });
   
    // con.query("SELECT * FROM person WHERE expired = 'N' ORDER BY person_id ASC LIMIT 1", function (err, result, fields) {
    //     if (err) throw err;
    //     // console.log(result);
    //     var setArray = result[0].name.split(' ');
    //     var set1 = setArray[0].length;
    //     var set2 = setArray[1].length;
    //     res.json({ id: result[0].person_id, set1: set1, set2: set2, hint: result[0].hint });
    // });
    
});

app.get("/hint", (req, res) => {
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        res.json({ hint: r.hint });
    });

    // con.query("SELECT hint FROM person WHERE expired = 'N' ORDER BY person_id ASC LIMIT 1", function (err, result, fields) {
    //     if (err) throw err;
    //     // console.log(result);
    //     res.json({ hint: result[0].hint });
    // });
    
});

app.use(express.json())

app.post('/guess', (req, res) => {    

    // console.log(req.body) // object
    var guess = req.body.guess;
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        let value = '';
        var name = r.name.replace(' ','');
        if (name === guess) {
            value = 'correct';
        } else {
            value = 'wrong'
        }
        res.json({ result: value });
    });
    
    // con.query("SELECT * FROM person WHERE expired = 'N' ORDER BY person_id ASC LIMIT 1", function (err, result, fields) {
    //     if (err) throw err;
    //     // console.log(result);
    //     let r = '';
    //     var name = result[0].name.replace(' ','');
    //     if (name === guess) {
    //         r = 'correct';
    //     } else {
    //         r = 'wrong'
    //     }
    //     res.json({ result: r });
    // });
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});