var express = require('express');
var router = express.Router();
var database = require('../routes/database.js');
var tmdb = require('../routes/tmdb.js');
var Promise = require('promise');


router.get('/', function(request, response){
	database.getMovieList().then(function(rows){
		if(rows.length == 0){
			response.render('pages/movieList.ejs', { 
				siteTitle: 'My Movie List',
				pageTitle: 'Home Page',
				movies : null
			});			
		}
		else{
			tmdb.fetchMoviesFromJSON(rows).then(function(data, err){
				response.render('pages/movieList.ejs', { 
					siteTitle: 'My Movie List',
					pageTitle: 'Home Page',
					movies : rows,
					images : data[0],
					overviews : data[1]
				});
			});
		}
	});
});


module.exports = router;