var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require("./dao/database.js")
require("./model/user.js");
require("./model/movie.js");
require("./model/actor.js");
require("./model/img.js");
require("./model/studio.js");
require("./model/theater.js");
require("./model/schedule.js");

var routes = require('./routes/index');
var users = require('./routes/users');
var movies = require("./routes/movies.js");
var actors = require("./routes/actors.js");
var files = require("./routes/files.js");
var imgs = require("./routes/imgs.js");
var studios = require("./routes/studios.js");
var theaters = require("./routes/theaters.js")
var seats = require("./routes/seats.js");
var schedules = require("./routes/schedules.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use('/', routes);
app.use('/users', users);
app.use('/movies', movies);
app.use('/actors', actors);
app.use('/files', files);
app.use('/studios', studios);
app.use('/imgs', imgs);
app.use('/theaters', theaters);
app.use('/seats', seats);
app.use('/schedules', schedules);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});