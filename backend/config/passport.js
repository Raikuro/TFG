var Strategy = require('../src/core/customStrategy').Strategy
var users = require('../src/users')

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.username)
  })

  passport.deserializeUser((username, cb) => {
    users.findByUsername(username, function (err, user) {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

  passport.use(new Strategy((username, cb) => {
    users.findByUsername(username, (err, user) => {
      if (err) { return cb(err) }
      if (!user) { return cb(null, false) }
      return cb(null, user)
    })
  }))
}
