module.exports = (app, login) => {
  let router = require('express').Router()
  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      res.status(200).send(require('./mock'))
    })

  router.get('/section/:themeId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log()
    res.status(200).send({body: 'Contenido del tema ' + req.params.themeId + ' - ' + req.params.sectionId})
  })

  app.use('/', router)
}
