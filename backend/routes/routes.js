module.exports = (app, login) => {
  let router = require('express').Router()
  let uvaAuth = require('../src/uva-auth')
  let passport = require('passport')
  require('../config/passport')(passport)
  app.use(passport.initialize())
  app.use(passport.session())

  router.post('/login',
    uvaAuth.authenticate(),
    passport.authenticate('custom'),
    (req, res) => {
      res.send({username: req.session.passport.user, isAlumn: req.session.isAlumn})
    }
  )

  router.get('/session',
    login.ensureLoggedIn(),
    (req, res) => {
      res.send({username: req.session.passport.user, isAlumn: req.session.isAlumn})
    }
  )

  router.get('/logout',
    (req, res) => {
      req.session.destroy(() => {
        res.status(204).send()
      })
    }
  )

  app.use('/', router)
}
