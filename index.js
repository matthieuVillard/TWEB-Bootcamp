var request = require('request-promise');

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