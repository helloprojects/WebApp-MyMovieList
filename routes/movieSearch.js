var express = require('express');
var router = express.Router();

const tmdbconfig = require('../config/tmdbconfig');
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb(tmdbconfig.config.key)


router.get('/', function(request, response){

	moviedb.discoverMovie({}).then(result =>{
		response.render('pages/movieSearch.ejs', { 
			siteTitle: 'My Movie List',
			pageTitle: 'Search Movie',
			searchType: 'unspecified',
			query: "All",
			results: result.results,
			totalResults: result.total_results
		});
	});
});


// When a user types into search bar and clicks search:
router.post('/', function(request, response){

	moviedb.searchMovie({query: request.body.keyword }, function(err, result){
        if(result != null && result.total_results >= 1){
            var results = result.results;
            console.log(results[0].id);

            response.render('pages/movieSearch.ejs', {
                siteTitle : 'My Movie List',
                pageTitle : 'Search Results',
                searchType: 'unspecified',
                query: request.body.keyword,
                results: results
            });
        }
        else{
            console.log("[ADDING ENTRY] No search results found.");
            response.redirect(baseURL + 'dvd/add');
        }
    }); 
});




//Display base page for specifying genre
router.get('/genre', function(request, response) {
	var genres;

	moviedb.genreMovieList({}).then(result =>{
		genres = result;

		moviedb.discoverMovie({}).then(result =>{
			response.render('pages/movieSearch.ejs', { 
				siteTitle: 'My Movie List',
				pageTitle: 'Search Movie',
				searchType: 'genre',
				query: null,
				results: result.results,
				totalResults: result.total_results,
				availableGenres: genres.genres
			});
		});
	}).catch(console.error);
});


// Return results for specified genre
router.post('/genre', function(request, response){
	var genre = request.body.genreDropdown;

	if(genre == 'nothing'){
		response.redirect("/movieSearch/genre");
	}
	else{
		var genreSplit = genre.split('-');

		moviedb.genreMovies({id: genreSplit[0]}).then(result =>{
			response.render('pages/movieSearch.ejs', { 
				siteTitle: 'My Movie List',
				pageTitle: 'Search Movie By Genre',
				searchType: 'unspecified',
				query: genreSplit[1],
				results: result.results,
				totalResults: result.total_results
			});
		}).catch(console.error);
	}
});




//THIS MAY BE TAKEN OUT!!!!
router.get('/rating', function(request, response){
	moviedb.discoverMovie({}).then(result =>{
		response.render('pages/movieSearch.ejs', { 
			siteTitle: 'My Movie List',
			pageTitle: 'Search Movie By Rating',
			searchType: 'rating',
			query: null,
			results: result.results,
			totalResults: result.total_results
		});
	});
});

//TODO: Sort releases by rating




router.get('/year', function(request, response){

	//multiple pages: {query: '', page: n}

	//default to discoverMovie until a query for specific year is made
	moviedb.discoverMovie({}).then(result =>{

		response.render('pages/movieSearch.ejs', { 
			siteTitle: 'My Movie List',
			pageTitle: 'Search Movie By Year',
			searchType: 'year',
			query: null,
			results: result.results,
			totalResults: result.total_results
		});
	});
});


router.post('/year', function(request, response){
	var year = request.body.yearDropdown;
	console.log("Searching for " + year);

	moviedb.discoverMovie({query: '', primary_release_year: year}).then(result =>{
		response.render('pages/movieSearch.ejs', { 
			siteTitle: 'My Movie List',
			pageTitle: 'Search Movie By Year',
			searchType: 'year',
			query: year,
			results: result.results,
			totalResults: result.total_results
		});
	});
});



module.exports = router;