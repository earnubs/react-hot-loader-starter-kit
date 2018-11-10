import { Router } from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

// TODO
import knex from '../db/knex';
import config from '../../config';

const SessionStore = RedisStore(session);

// TODO get web, postgres, redis hostnames ...
const SESSION_SECRET = config.get('session:secret');
const GITHUB_CLIENT_ID = config.get('oauth:github:clientId');
const GITHUB_CLIENT_SECRET = config.get('oauth:github:secret');

const router = Router();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex('users').where({ id })
    .first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); }); // eg. Error: Failed to deserialize user out of session
});

passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://web:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return knex('users').where({ github_id: profile.id }).first()
      .then((user) => {

        if (!user) {
          knex('users').insert({
            github_id: profile.id,
            displayName: profile.displayName,
          })
            .returning('*')
            .then((row) => {
              return done(null, row[0]);
            });
        }

        return done(null, user);
      })
      .catch((err) => { return done(err); });
  }
));

router.use(session({
  store: new SessionStore({
    host: 'redis',
    port: 6379
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Oh no, no session!')); // handle error
  }
  next(); // otherwise continue
});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // put displayName in session?
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

export default router;
