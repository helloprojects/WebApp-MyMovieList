var express = require('express');
var router = express.Router();


router.get('/', function(request, response) {
	response.render('pages/register.ejs', { 
		siteTitle: 'My Movie List',
		pageTitle: 'Create Account'
  	});
});

 
module.exports = router;