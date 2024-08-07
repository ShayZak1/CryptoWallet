var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/html/ethereum.html");
});

app.get("/ethereum", function(req, res){
    res.sendFile(__dirname + "/public/html/ethereum.html");
});

app.get("/celo", function(req, res){
    res.sendFile(__dirname + "/public/html/celo.html");
});

app.get("/bnb", function(req, res){
    res.sendFile(__dirname + "/public/html/bnb.html");
});

app.get("/arbitrum", function(req, res){
    res.sendFile(__dirname + "/public/html/arbitrum.html");
});

console.log("http://localhost:8080/");
app.listen(8080);
