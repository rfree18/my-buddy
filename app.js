require('./db.js')

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var nconf = require('nconf');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

var indexRouter = require('./routes/index');
var showtimeRouter = require('./routes/showtime');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};

nconf.env().file({
  file: 'config.json'
});

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/showtime', showtimeRouter);

// Auth docs from http://www.passportjs.org/docs/
passport.use(new GoogleStrategy({
    clientID: nconf.get('passId'),
    clientSecret: nconf.get('passSec'),
    callbackURL: "/showtime/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id,
      name: profile.displayName
    }, function(err, user) {
      console.log(user);
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
