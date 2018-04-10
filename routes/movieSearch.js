var express = require('express');
var router = express.Router();



router.get('/genre', function(request, response) {
  response.render('pages/movieSearch.ejs', { 
  	siteTitle: 'My Movie List',
	pageTitle: 'Search Movie By Genre',
	searchType: 'genre'
  });
});

router.get('/rating', function(request, response){
	response.render('pages/movieSearch.ejs', { 
  		siteTitle: 'My Movie List',
		pageTitle: 'Search Movie By Rating',
		searchType: 'rating'
  	});
});

router.get('/year', function(request, response){
	response.render('pages/movieSearch.ejs', { 
  		siteTitle: 'My Movie List',
		pageTitle: 'Search Movie By Year',
		searchType: 'year'
  	});
});


module.exports = router;