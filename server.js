var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static('dist'))

app.get('/about', function(req, res) {
    res.sendFile(__dirname + "/dist/" + "About.html");
});

app.get('/help', function(req, res) {
    res.sendFile(__dirname + "/dist/" + "Help & FAQ.html");
});

app.listen(3000);