module.exports = (app, login) => {
  let router = require('express').Router()
  let uvaAuth = require('../src/uva-auth')
  let passport = require('passport')
  require('../config/passport')(passport)
  app.use(passport.initialize())
  app.use(passport.session())

  let sessionController = require('./sessionController')

  router.post('/login',
    uvaAuth.authenticate(),
    passport.authenticate('custom'),
    sessionController.getUser
  )

  router.get('/session',
    login.ensureLoggedIn(),
    sessionController.getUser
  )

  router.get('/logout',
    sessionController.logout
  )

  app.use('/', router)
}
