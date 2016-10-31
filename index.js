var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express'); 
var path = require('path');
var router = express.Router();  
var app = express(); 
var multer = require('multer');
var upload = multer();
var fetch = require('node-fetch');
var bodyParser = require('body-parser');

// Due to the fact we have some common work with the group of Loïc Serafin and Julien Leroy, and as we had some issues with the server,
// there can be some similarity with their files because they inspired us.

// Connection URL
var url = 'mongodb://127.0.0.1:27017/git';

MongoClient.connect(url, function () {
    console.log("Connection to MongoDb");
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/repos/*', function (req, res) {
    fetch('https://api.github.com' + req.url, {headers: {'Authorization': 'token 9d80e1036f77ddbdc3daeca7865637e5fb3caac7'}})
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        res.json(json);
    });
});

app.use(express.static('app'));
app.use('/api', router);

router.get('/req', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('request');
        collection.find().sort({date:-1}).toArray(function (err, data) {
            res.send(data);
        });
        db.close();
    });
});

router.post('/req', upload.array(), function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('request');
        collection.insert({user: req.body.user, repository: req.body.repository, date: new Date(), ip: ip})
        res.json({ message: 'Done' });
        db.close();

    });
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Server listening");
});