// Require/import the HTTP module
var http = require("http");
var fs = require("fs");
var express = require("express");

const db = require(__dirname + '/db/db.json')

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 8080;

app.use(express.static('public'))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/notes", function(req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", function(req, res) {
    res.json(db);
});
  
app.post("/api/notes", function(req, res) {
    req.body['id'] = db.length + 1;
    db.push(req.body);
    res.sendStatus(200);
});

app.delete("/api/notes/:id", function(req, res) {
    var i = 0;
    for (i = 0; i < db.length; i++) {
        if (db[i].id == req.params["id"]) {
            db.splice(i, 1);
            break;
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, function() {

  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
