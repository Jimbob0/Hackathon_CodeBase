
// $ npm init

// $ npm install --save express

var express = require("express");

var app = express();

var PORT = process.env.port || 8000;

// if we want to handle post requests

// $ npm install --save body-parser

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// if we want to handle session (login, etc)

// $ npm install --save express-session

app.use(session({
	secret: "Secret Key",
	resave: false,
	saveUninitialized: false
}));

//do this for every request
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

// if we want to respond to GET requests for "/"
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// if we want to respond to POST requests for "/api"
app.post("/api", function(req, res) {
	res.send("success");
});

// if we want to serve static files out of ./public
app.use(express.static("public"));

// actually start the server
app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});