var request = require('request-promise');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

function fetchData(){
    var options = {
        uri: 'http://api.tvmaze.com/shows',
        headers: {
            'User-Agent': 'Request-Promise'
        }, 
        json: true
    };

    return request(options)
        .then(function(shows){
            console.log("I have received " + shows.length + " shows." );
        })
        .catch(function(err){
            console.log("Something bas has happened");
            console.log(err);
        });
}

// Connection URL
var url = 'mongodb://127.17.0.2:27017/tvdemo';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
  
    console.log("Connected successfully to server");

    db.close();
});