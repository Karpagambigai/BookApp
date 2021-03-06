const passport = require('passport');
const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Store user in the session
    passport.serializeUser((user, done) => {
        debug(user);
        done(null, user);
    });

    // Retrieves user from the session
    passport.deserializeUser((user, done) => {
        debug(user);
        // find the suer by id
        done(null, user);
    });
};
