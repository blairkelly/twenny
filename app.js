//twenny

var path = require('path');
var find = require('find');  //was specified for route, but not in registry.
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var app = express();           // start Express framework

var main_middleware = function main_middleware (req, res, next) {
	var body_classes = [];
	//check client
	var ua = req.headers['user-agent'];
    if (/mobile/i.test(ua)) {
    	body_classes.push('mobile');
    } else {
        body_classes.push('desktop');
    }
    if (/iPhone OS/i.test(ua)) {
        body_classes.push('iphone');
    } else if (/Nexus 5/i.test(ua)) {
        body_classes.push('nexus-5');
    } else if (/Nexus 4/i.test(ua)) {
        body_classes.push('nexus-4');
    }
    res.locals.body_classes = body_classes.join(' ');
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

module.exports = {
    app: app,
};

//routes
require('./routes/style');
find.fileSync('route.js', __dirname + '/views').forEach(function (route_file) {  //-     /\.js$/
    require(route_file);
});