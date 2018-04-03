


// Core Node Modules:
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Promise = require('promise');


// Route References:
var index = require('./routes/index');
var movieList = require('./routes/movieList');


var app = express();


// View Engine Setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Setup Application Dependencies:
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Assign routes to url
app.use('/', index);
app.use('/movieList', movieList);


// Handle 404 Error and forward to Error Handler
app.use(function(request, response, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// Error Handler
app.use(function(error, request, response, next){
	// Only throw error in development
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};
	response.status(error.status || 500);
	response.render('pages/error');
});


module.exports = app;