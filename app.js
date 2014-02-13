
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


var login = require('./routes/login');
var main = require('./routes/main');
var newresv = require('./routes/newresv');
var liveview = require('./routes/liveview');
var choosestop = require('./routes/choosestop');
var viewcam = require('./routes/viewcam');


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('SeriousBUS-Iness'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/process_login', login.process);
app.get('/main', main.view);

app.get('/newresv', newresv.view);
app.get('/liveview', liveview.view);
app.get('/choosestop', choosestop.view);
app.get('/viewcam', viewcam.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
