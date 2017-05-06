var Strategy = require('../src/core/customStrategy').Strategy
var User = require('../src/user')

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.username)
  })

  passport.deserializeUser((username, cb) => {
    User.findByUsername(username, function (err, user) {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

  passport.use(new Strategy((username, cb) => {
    User.findByUsername(username, (err, user) => {
      if (err) { return cb(err) }
      if (!user) { return cb(null, false) }
      return cb(null, user)
    })
  }))
}
