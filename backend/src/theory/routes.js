let Theory = require('./theory')
let Section = require('./section')
// let mysqlConnection = require('../core/mysqlConnection')

module.exports = (app, login) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      Theory.getIndex().then((index) => {
        res.status(200).send(index)
      })
    })

  router.get('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    Section.getSection(req.params.sectionId)
    .then((section) => {
      res.status(200).send(section)
    })
  })

  router.post('/index/:lessonId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords)
      .save(req.params.lessonId)
      .then((e) => {
        res.status(204).send()
      })
  })

  router.put('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords)
    .save(req.params.lessonId)
    .then((e) => { res.status(204).send() })
  })

  app.use('/', router)
}
