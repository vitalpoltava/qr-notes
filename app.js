
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , upload = require('./routes/upload')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT);
  app.set('domain', process.env.IP);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('poltava'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.redirect('main.html');
});

app.get('/main.html', function(req, res) {
    res.sendfile('main.html');
});

app.get('/main.js', function(req, res) {
    res.sendfile('main.js');
});

app.get('/snapshot.html', function(req, res) {
    res.sendfile('snapshot.html');
});

app.get('/state.js', function(req, res) {
    res.sendfile('state.js');
});

/*
app.get('/', routes.index);
app.post('/upload', upload.upload_mockup);
app.get('/users', user.list);
*/


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
