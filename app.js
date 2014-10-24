//twenny

var path = require('path');
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var app = express();           // start Express framework

var main_middleware = function main_middleware (req, res, next) {
    next();
}

app.set('views', path.join(__dirname + '/views/'));
app.set('view engine', 'jade');
app.enable('trust proxy');
app.use(cookieParser());
app.use(session({ secret: 'jasmine top' }));
app.use(main_middleware);
app.use(express.static(path.join(__dirname + '/public')));


var server = http.createServer(app); // start an HTTP server
server.listen(process.env.PORT || 3000);


//routes
app.get('/', function (req, res) {
	res.send('twenny');
});