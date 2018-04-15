var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var mysql = require('mysql');
var mysqlconfig = require('../config/dbconfig');
var bcrypt = require('bcryptjs');
const saltRounds = 10;


/**
 * Registration Page
 * GET to /register
 */
router.get('/', function (request, response) {
	response.render('pages/register.ejs', {
		siteTitle: 'My Movie List',
		pageTitle: 'Create Account',
		message: ''
	});
});


/**
 * Account Registration BETA 0.1 
 * POST to /register/submit 
 */
router.post('/submit',
	[
		sanitize('username').trim().escape(),
		sanitize('password').trim().escape(),
		sanitize('first_name').trim().escape(),
		sanitize('last_name').trim().escape(),
		sanitize('email').trim().escape()
	],
	function (req, res, next) {
		var username = req.body.username;
		var password = req.body.password;
		var passwordVerify = req.body.pwVerified;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var email = req.body.email;

		// Client input, this is a test, remove later.
		console.log(username);
		console.log(password);
		console.log(passwordVerify);
		console.log(first_name);
		console.log(last_name);
		console.log(email);

		// Hashing Password
		bcrypt.hash(password, saltRounds, function(err, hash) {
			var connection = mysql.createConnection(mysqlconfig);
			connection.query("INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`) VALUES (" + "\'" + username + "\'" + "\," + "\'" + hash + "\'" + "\," + "\'" + first_name + "\'" + "\," + "\'" + last_name + "\'" + "\," + "\'" + email + "\'" + ")", function (error, results, fields) {
				if (error) {
					console.log(error);
					connection.end();
					res.render('pages/register.ejs', {
						siteTitle: 'My Movie List',
						pageTitle: 'Create Account',
						message: 'Failed to register.'
					});
				} else {
					console.log(results);
					connection.end();
					res.render('pages/register.ejs', {
						title: 'Movie List - Home Page',
						siteTitle: 'My Movie List',
						pageTitle: 'Create Account',
						message: 'Success, an account has been created, you can now log-in.'
					});
				}
			});
		});	
	});

module.exports = router;