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
        if (typeof r == "undefined") {
            let fileName = __dirname + '/people.json';
            for (var i = 0; i < obj.data.length; i++) {
                obj.data[i].expired = 'N';
            }
            fs.writeFile(fileName, JSON.stringify(obj, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
            r = obj.data.find(a => a.expired == 'N');
        }

        let specialArray = [];
        let str = r.name.replace(' ', '')
        for(var i=0; i<str.length;i++) {
            if (str[i] === ".") {
                let obj = { index: i, char: "."}
                specialArray.push(obj)  
            }
            if (str[i] === "-") {
                let obj = { index: i, char: "-"}
                specialArray.push(obj)  
            }
            if (str[i] === "_") {
                let obj = { index: i, char: "_"}
                specialArray.push(obj)  
            }
        }

        var setArray = r.name.split(' ');
        var set1 = setArray[0].length;
        var set2 = null;
        if (setArray.length > 1) {
            set2 = setArray[1].length;
        }
        res.json({ id: r.id, set1: set1, set2: set2, hint: r.hint, specialArray: specialArray });
        
    });
    
}); 


app.get("/history", (req, res) => {
    var obj;
    var arr = []
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        var r = obj.data.filter((a) => a.expired == 'Y')
        if (typeof req == "undefined") {
            arr = []
            return
        } else {
            r.forEach(element => {
                arr.push(element.id)
            });
        }
        // console.log(arr)
        res.json({ arr: arr });
    });
}); 


app.get("/giveup", (req, res) => {
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        if (typeof r == "undefined") {
            let fileName = __dirname + '/people.json';
            for (var i = 0; i < obj.data.length; i++) {
                obj.data[i].expired = 'N';
            }
            fs.writeFile(fileName, JSON.stringify(obj, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
            r = obj.data.find(a => a.expired == 'N');
        }

        var setArray = r.name.split(' ');
        var set1 = setArray[0];
        var set2 = null;
        if (setArray.length > 1) {
            set2 = setArray[1];
        }
        res.json({ id: r.id, set1: set1, set2: set2 });
        
    });
    
}); 


app.get("/hint", (req, res) => {
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        res.json({ hint: r.hint });
    });
    
});

app.get("/debug", (req, res) => {
    var obj;
    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
        if (err) throw err;
        let fileName = __dirname + '/people.json';
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        if (typeof r == "undefined") {
            for (var i = 0; i < obj.data.length; i++) {
                obj.data[i].expired = 'N';
            }
        } else {
            r.expired = "Y";
        }
        fs.writeFile(fileName, JSON.stringify(obj, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
    });

    fs.readFile(__dirname + '/people.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        let r = obj.data.find(a => a.expired == 'N');
        if (typeof r == "undefined") {
            let fileName = __dirname + '/people.json';
            for (var i = 0; i < obj.data.length; i++) {
                obj.data[i].expired = 'N';
            }
            fs.writeFile(fileName, JSON.stringify(obj, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
            r = obj.data.find(a => a.expired == 'N');
        }

        let specialArray = [];
        let str = r.name.replace(' ', '')
        for(var i=0; i<str.length;i++) {
            if (str[i] === ".") {
                let obj = { index: i, char: "."}
                specialArray.push(obj)  
            }
            if (str[i] === "-") {
                let obj = { index: i, char: "-"}
                specialArray.push(obj)  
            }
            if (str[i] === "_") {
                let obj = { index: i, char: "_"}
                specialArray.push(obj)  
            }
        }

        var setArray = r.name.split(' ');
        var set1 = setArray[0].length;
        var set2 = null;
        if (setArray.length > 1) {
            set2 = setArray[1].length;
        }
        res.json({ id: r.id, set1: set1, set2: set2, hint: r.hint });
    });
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
            value = 'Correct';
        } else {
            value = 'Wrong'
        }
        res.json({ result: value });
    });
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});
