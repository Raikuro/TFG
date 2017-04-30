module.exports = (app, login) => {
  let router = require('express').Router()
  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      res.status(200).send(require('./mock'))
    })

  router.get('/index/:themeId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log()
    res.status(200).send({
      name: 'Section ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      content: 'Contenido del tema ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      related: 'Palabras prueba'
    })
  })

  router.post('/index/:themeId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log()
    res.status(200).send({
      name: 'Section ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      content: 'Contenido del tema ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      related: 'Palabras prueba'
    })
  })

  router.put('/index/:themeId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log()
    res.status(200).send({
      name: 'Section ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      content: 'Contenido del tema ' + (parseInt(req.params.themeId) + 1) + ' - ' + (parseInt(req.params.sectionId) + 1),
      related: 'Palabras prueba'
    })
  })

  app.use('/', router)
}
