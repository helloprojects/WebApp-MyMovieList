var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var Promise = require('promise');


var dbConnection = mysql.createConnection(dbconfig.config);


module.exports.getMovieList = function(){
	var query = "SELECT * FROM movies ORDER BY movieID DESC";
	
	return new Promise(function(resolve, reject){
		dbConnection.query({
			sql: query,
			timeout: 1000,
		},
		function(err, rows, fields){
			if(err){
				return reject(err);
			}
			else{
				console.log("Finished fetching movie list from DB.");
				return resolve(rows);
			}
		});
	});
};



module.exports.closeConnection = function(){
	dbConnection.end();
}