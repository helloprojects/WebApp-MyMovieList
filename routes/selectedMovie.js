var express = require('express');
var router = express.Router();
var tmdbconfig = require('../config/tmdbconfig');
var TheMovieDB = require('moviedb')(tmdbconfig.config.key);



//Fetch info for movie from id
router.get('/:id', function(request, response){
	var movieID = request.params.id.substring(1);	//remove colon

	TheMovieDB.movieInfo({id: movieID}, function(err,result){
		if(err){
			console.log("No movie info found for " + movieID)
		}
		else{
			response.render('pages/selectedMovie.ejs', { 
				siteTitle: 'My Movie List',
				pageTitle: result.title,
				data: result
  			});
		}
	});
});



//Add movie with id to user's selected list, refresh page
router.post('/:id', function(request, response){
	// 0 = ---, 1 = PlanToWatch, 2 = Watched

	var addToList = request.body.listType;
	
	if(addToList == 1){
		console.log("Adding " + request.params.id + " to Plan To Watch List.");
		//NOTE: Check if entry already in user's list
	}
	else if(addToList == 2){
		console.log("Adding "  + request.params.id + " to Watched List.");
		//NOTE: Check if entry already in user's list
	}
	else{
		//Do nothing, just refresh page
	}
	response.redirect("/selectedMovie/" + request.params.id);
});



 
module.exports = router;