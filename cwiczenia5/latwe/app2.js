// Application using the 'Pug' template systemlikacja z wykorzystaniem systemu szablonów 'Pug'
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 3;
 
// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          //Use the 'Pug' template system
 
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack - every request will be logged in the console in the 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory
 
// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(x + "+" + y + "=" + (x+y)); // Send a response to the browser
})

app.get('/add/:x/:y', function (req, res) {     // The first route
    res.send(req.params.x + "+" + req.params.y + "=" + (parseInt(req.params.x)+parseInt(req.params.y))); // Send a response to the browser
})
 
// The application is to listen on port number 3000
app.listen(3000, function () {                  
    console.log('The application is available on port 3000');
});