var express = require('express');
var router = express.Router();



router.get('/', function(request, response) {
  response.render('pages/contact.ejs', { 
  	siteTitle: 'My Movie List',
	pageTitle: 'Contact Us'
  });
});

 
module.exports = router;