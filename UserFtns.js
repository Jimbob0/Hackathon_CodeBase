// access the file system
var fs = require("fs");

// This will be the array of user objects
var usersArr;

// if users.json doesn't exist, create one
try {
	usersArr = JSON.parse(fs.readFileSync("./users.json"));
} catch (e) {
	usersArr = [];
}

// check if a user exists and return undefined if they don't
function userExists(username) {
	for (var i = 0; i < usersArr.length; i++) {
		if (usersArr[i].username === username) {
			return usersArr[i];
		}
	}
	return undefined;
}

//Check that a username and password match a user in the database. Return a boolean.
function checkLogin (username, password) {
	var user = userExists(username);
	if (user && user.password === password) {
		return true;
	}
	return false;
}

/*
	Register a new user. Return a boolean representing
	whether the registration was successful. Double
	check that the username isn't used before registering.
*/
function registerUser(username, password) {
	if (userExists(username)) {
		return false;
	}
	// We're just using an object literal
	usersArr.push({
		username: username,
		password: password
	});
	//save all users as JSON into users.json
	saveAllUsers();
	return true;
}

/*
	Take the entire array of users, convert it to a JSON
	string, and save it into users.json. We only care about
	the callback if there's an error.
*/
function saveAllUsers() {
	fs.writeFile(
		"./users.json",
		JSON.stringify(usersArr),
		function(err) {
			if (err) {
				console.log(err);
			}
		}
	);
}

//Expose each of the functions as properties on an object to the other files
module.exports = {
	userExists : userExists,
	checkLogin : checkLogin,
	registerUser : registerUser,
	saveAllUsers : saveAllUsers
};
