var Strategy = require('../app/core/customStrategy').Strategy;
var users = require('../app/users');

module.exports = function(passport) {
  
  passport.serializeUser(function(user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(function(username, cb) {
    users.findByUsername(username, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  
  passport.use(new Strategy(function(username, cb) {
    users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));
  
};
