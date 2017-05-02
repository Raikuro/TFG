let Theory = require('./theory')
let Section = require('./section')

module.exports = (app, login) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      Theory.getIndex()
      .then((index) => { res.status(200).send(index) })
      .catch((e) => { res.status(500).send(e) })
    })

  router.get('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    Section.getSection(req.params.sectionId)
    .then((section) => { res.status(200).send(section) })
    .catch((e) => { res.status(500).send(e) })
  })

  router.post('/index/:lessonId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
  })

  router.put('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
  })

  router.delete('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords)
    .delete()
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
  })

  app.use('/', router)
}
