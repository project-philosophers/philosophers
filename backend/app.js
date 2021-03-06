var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


// session
const session = require('express-session');
app.use(session({
  secret: 'philosophers',
  resave: true,
  saveUninitialized: true,
  // proxy: true,
  cookie: {
    httpOnly: false, 
    secure: false,
    maxAge: 30 * 24 * 60 * 1000
  }
}));
// app.set("trust proxy", true);
// app.use(session({
//   secret: 'philosophers',
//   resave: true,
//   saveUninitialized: true,
//   proxy: true,
//   cookie: {
//     // httpOnly: false,
//     httpOnly: true,  
//     secure: true,
//     maxAge: 30 * 24 * 60 * 1000
//   }
// }));

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

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
