const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const app = express();
const auth = express.Router();
const db = mongoose.connection;
const config = require('../../config/config').LOGIN_SERVICE;
const KEYS = require('../../config/config.privatekeys.js');


mongoose.connect(config.DB_URI);

db.on('error', () => console.error('Login Service: error: connection to DB failed'));
db.on('open', () => console.log('Login Service connected to DB'));


// USER SCHEMA CONFIG
const UserSchema = new mongoose.Schema({
  facebook: {id: String, token: String, name: String, email: String},
});

UserSchema.index({'facebook.id': 1});

const User = mongoose.model('User', UserSchema);

// PASSPORT MIDDLEWARE USER LOOKUP/CREATION
passport.use(new FacebookStrategy(Object.assign(KEYS.facebookAuth, {profileFields: ['id', 'email', 'name']}),
  async (token, refreshToken, profile, done) => {
    let user;
    try {
      user = await User.findOne({'facebook.id': profile.id}).exec();
    } catch (err) { console.error('Error occured searching for user'); done(err); }

    if (user) {
      user = user.toObject();
      user.token = jwt.sign({name: user.name, id: user.id}, KEYS.JWT_SECRET);
      return done(null, user);
    }

    // Create new user if not found in db
    try {
      user = await new User({
        facebook: {
          id: profile.id,
          token,
          name: profile.name.givenName + ' ' + profile.name.familyName,
          email: profile.emails[0].value,
        }
      }).save();
    } catch (err) {
      console.error('Error creating new user ' + err);
      done(err);
    }

    user = user.toObject();
    user.token = jwt.sign({name: user.name, id: user.id, email: user.email}, KEYS.JWT_SECRET);

    done(null, user);
  }));

// MIDDLEWARE INIT
app.use(bodyParser.json());
auth.use(passport.initialize());
app.use('/auth', auth);

// ROUTES
auth.route('/facebook')
  .get(passport.authenticate('facebook', { scope : ['email'] }));

auth.route('/facebook/callback')
  .get(passport.authenticate('facebook',
    {
      session: false,
      failureRedirect: '/auth/fail'
    }),
    (req, res) => {
      res.cookie('token', req.user.token, {
        domain: '.' + config.domain,
        expires  : new Date(Date.now() + 1000 * 60 * 60 * 2),
        httpOnly : false
      });
      const redirAddr = 'http://' + require('../../config/config').DOMAIN;
      console.log(redirAddr);
      res.send(`<html><body><a href="${redirAddr}">Go Back</a></body></html>`);
    }
  );

auth.get('/fail', (req, res) => res.send('Login Fail') );
auth.get('/success', (req, res, next) => { 
   console.log('Login Success');
  next()
  },
  (req, res) => {
  }
);

app.listen(config.PORT, config.ADDRESS, () => console.log( `Login Service listening on ${config.ADDRESS}:${config.PORT}`) );
