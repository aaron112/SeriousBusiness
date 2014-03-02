
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');


var login = require('./routes/login');
var main = require('./routes/main');

var newresvold = require('./routes/newresv-old');
var newresv = require('./routes/newresv');
var getstops = require('./routes/getstops');
var getsch = require('./routes/getsch');

var liveview = require('./routes/liveview');
var viewcam = require('./routes/viewcam');
var viewmap = require('./routes/viewmap');

var processresv = require('./routes/processresv');
var confirmresv = require('./routes/confirmresv');


var local_database_name = 'sb';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

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
app.post('/process_login', login.process);
app.get('/process_login', login.process);
app.get('/main', main.view);

app.get('/newresv-old', newresvold.view);
app.get('/newresv', newresv.view);
app.get('/getstops', getstops.view);
app.get('/getsch', getsch.view);

app.get('/confirmresv', confirmresv.view);

app.get('/liveview', liveview.view);
app.get('/viewcam', viewcam.view);
app.get('/viewmap', viewmap.view);

app.get('/addresv', processresv.add);
app.get('/removeresv', processresv.remove);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
