module.exports = (app, login) => {
  let router = require('express').Router()
  let uvaAuth = require('../src/uva-auth')
  let passport = require('passport')
  require('../config/passport')(passport)
  app.use(passport.initialize())
  app.use(passport.session())

  /* app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs'); */

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

  // LEGADO

  /* router.get('/',
    function(req, res) {
      res.render('home', { user: req.user });
    }
  );

  router.get('/login',
    function(req, res){
      res.render('login');
    }
  );

  router.get('/profile',
    login.ensureLoggedIn(),
    function(req, res){
      res.render('profile', { user: req.user });
    }
  );

  //LEGADO - FIN
  */

  app.use('/', router)
}
