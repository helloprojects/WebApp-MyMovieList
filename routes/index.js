var express = require('express');
var router = express.Router();



router.get('/', function(request, response) {
  response.render('pages/index.ejs', { 
  	siteTitle: 'My Movie List',
	pageTitle: 'Home Page'
  });
});

 
module.exports = router;