module.exports = (app, login) => {
  let router = require('express').Router();
  let uvaAuth = require('../app/uva-auth');
  let passport = require('passport');
  require('../config/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');

  router.get('/',
    function(req, res) {
      res.render('home', { user: req.user });
    }
  );

  router.get('/login',
    function(req, res){
      res.render('login');
    }
  );
    
  router.post('/login',
    uvaAuth.authenticate(),
    passport.authenticate('custom', { failureRedirect: '/login',
                                    successReturnToOrRedirect: '/'}),
    function(req, res) {
      res.redirect('/');
    }
  );
    
  router.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/');
    }
  );

  router.get('/profile',
    login.ensureLoggedIn(),
    function(req, res){
      res.render('profile', { user: req.user });
    }
  );

  app.use('/', router);
  
}