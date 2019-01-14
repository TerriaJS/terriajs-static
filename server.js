var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080

app.get('/about.html', function(req, res) {
    res.sendFile(__dirname + "/dist/" + "About.html");
});

app.get('/help.html', function(req, res) {
    res.sendFile(__dirname + "/dist/" + "Help.html");
});

app.listen(3000);
