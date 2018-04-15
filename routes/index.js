var express = require('express');
var router = express.Router();

const tmdbconfig = require('../config/tmdbconfig');
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb(tmdbconfig.config.key)



router.get('/', function(request, response) {
	var popular;

	moviedb.miscTopRatedMovies({}).then(result =>{
		popular = result.results;

		moviedb.discoverMovie({}).then(latest =>{
			response.render('pages/index.ejs', { 
				siteTitle: 'My Movie List',
				pageTitle: 'Home Page',
				popularMovies: popular,
				latestMovies: latest.results
			});
		}).catch(console.error);
	}).catch(console.error);
});

 
module.exports = router;