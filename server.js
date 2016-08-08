// include external modules
var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var mongoose = require("mongoose");
var UserFtns = require("./UserFtns.js");
var Schema = mongoose.Schema;
var app = express();

// set the port for use
var PORT = process.env.port || 8000;

// connect to the mongo DB
mongoose.connect('mongodb://localhost');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
// Schema
var postSchema = new Schema({
	title: String,
	body: String,
	date: Number,
	votes: Number,
	user: String
});
var post = mongoose.model('post', postSchema);
// Upload from the new_page inputs
app.post('/posts', function(req,res){
	var content = new post(
        { id: Number,
        title: req.body.titleStr,
		body: req.body.bodyStr,
		votes: 0,
		date: Date.now(),
        user: req.session.user
        });
	content.save(function(err){
       if(err){
            res.send(err);
            return console.log(err);
        } else {
            res.send('success')
        }
    });
});
// Display posts by date on the index page
app.get('/posts',function(req,res){
	post.find("posts/:title", function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
	});
});

// update votes 
app.post("/posts/votes", function(req, res) {
    console.log(req.body.postId);
    post.findOneAndUpdate(
        { _id : req.body.postId},
        { $inc : {'votes' : 1}}, function(err, vote){
            if(err){
                return console.log(err)
            }
            else {
                return console.log(vote)
            }
        }
    );
});
/*
app.get("/posts", function(err, data){
	post.find("posts/:id/:votes", function(){
        res.send(JSON.stringify(posts.filter(function(vote){
            return vote.postId == req.params.postId
        })));
	});
})
*/
// if we want to respond to GET requests for "/"
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

// if we want to respond to POST requests for "/api"
app.post("/api", function(req, res) {
	res.send("success");
});
app.get('/login', function(req, res){
	res.sendFile(__dirname + "/public/login.html");
});

app.post('/login', function(req, res){
	if (UserFtns.checkLogin(req.body.username, req.body.password))
	{
		req.session.user = req.body.username;
		res.send("success");
	}else {
		res.send("error");
	}
});

app.post('/logout', function(req,res){
	req.session.user = "";
	res.redirect("/index.html");
});

app.get('/new_post(.html)?', function(req,res) {
	if (!req.session.user) {
		res.redirect("/login");
		return;
	}
	res.sendFile(__dirname + "/public/new_post.html");
});

app.post('/register', function(req, res){
	//shorthand variables to save us time
	var username = req.body.username;
	var password = req.body.password;
	if (UserFtns.userExists(username)) {
		// If the username already exists
		if (UserFtns.checkLogin(username, password)) {
			// ... and they have the right password
			// then log the user in
			req.session.user = username;
			// Send "success" so that the frontend knows
			// it is ok to redirect to /map
			res.send("success");
		} else {
			// Otherwise, they might be trying to
			// take a username that already exists - error!
			res.send("error");
		}
	} else {
		// Username is not taken, register a new user
		// and log them in - success!
		if(UserFtns.registerUser(username, password)) {
			req.session.user = username;
			// Send "success" so that the frontend knows
			// it is ok to redirect to /map
			res.send("success");
		} else {
			// there was a problem registering
			res.send("error");
		}
	}
});
// if we want to serve static files out of ./public
app.use(express.static("public"));

// actually start the server
app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});
