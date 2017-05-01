let Lesson = require('./lesson')
let Theory = require('./theory')
let Section = require('./section')
let mysqlConnection = require('../core/mysqlConnection')

module.exports = (app, login /* , mysqlConnection */) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      Theory.getIndex(mysqlConnection).then((index) => {
        res.status(200).send(index)
      })
    })

  router.get('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    mysqlConnection.query('SELECT S.title, S.content FROM sections S WHERE S.id = ?', [req.params.sectionId], (err, section) => {
      if (err) { throw err }
      section = section[0]
      mysqlConnection.query('SELECT K.keyword FROM keywordRelations K WHERE K.section = ?', [req.params.sectionId], (err, keywords) => {
        if (err) { throw err }
        keywords = keywords.map((element) => { return element.keyword })
        res.status(200).send(new Section(req.params.sectionId, section.title, section.content, keywords))
      })
    })
  })

  router.post('/index/:lessonId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords).save(req.params.lessonId)
    res.status(204).send()
  })

  router.put('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    let section = JSON.parse(req.body.section)
    new Section(section.id, section.title, section.content, section.keywords).save(req.params.lessonId)
    res.status(204).send()
  })

  app.use('/', router)
}
