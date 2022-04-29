var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var app = express();

app.use(cors());


// session
const session = require('express-session');

app.set("trust proxy", 1);
app.use(session({
  secret: 'philosophers',
  resave: true,
  saveUninitialized: false,
  // proxy: true,
  cookie: {
    httpOnly: true,  
    secure: (process.env.NODE_ENV && process.env.NODE_ENV == 'production') ? true : false,
    maxAge: 30 * 24 * 60 * 1000
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);


// nuxt
const staticFiles = express.static(path.join(__dirname, '../frontend/dist/'));
app.use(staticFiles);

// any routes not picked up by the server api will be handled by the nuxt router
app.use('/*', staticFiles)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
