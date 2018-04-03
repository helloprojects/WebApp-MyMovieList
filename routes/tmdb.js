var express = require('express');
var router = express.Router();
var tmdbconfig = require('../config/tmdbconfig');
var Promise = require('promise');

var TheMovieDB = require('moviedb')(tmdbconfig.config.key);


function fetchMovieFromID(movieID){
	console.log("   Fetching TMDB data for movieID: " + movieID);
	return new Promise(function(resolve, reject){
		TheMovieDB.movieInfo({id: movieID}, function(err,result){
			if(err){
				return reject(err);
			}
			else{
				return resolve([(tmdbconfig.config.basePoster + result.poster_path), result.overview]);
			}
		});
	});
}


module.exports.fetchMoviesFromJSON = function(movies){
	var images = [];
	var overviews = [];
	var promises = [];

	return new Promise(function(resolve, reject){
		movies.forEach(function(movie, index){
			promises.push(fetchMovieFromID(movie.TMDB_ID).then(function(data){
				images[index] = data[0];
				overviews[index] = data[1];
			}));
		});
		if(promises.length === movies.length){
			Promise.all(promises).then(function(data, err){
				if(err){
					return reject(err);
				}
				else{
					console.log("All TMDB Data fetches were fulfilled!");
					return resolve([images, overviews]);
				}
			});
		}
	});
};