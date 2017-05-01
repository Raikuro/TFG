let Lesson = require('./theory').Lesson
let Theory = require('./theory').Theory
let Section = require('./theory').Section

module.exports = (app, login, mysqlConnection) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    (req, res) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { throw err }
        let theory = new Theory()
        lessons.map((lesson, index, array) => {
          let lessonAux = new Lesson(lesson.id, lesson.title)
          mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [lesson.id], (err, sections) => {
            if (err) { throw err }
            sections.map((section) => {
              lessonAux.sections.push(new Section(section.id, section.title))
            })
            theory.lessons.push(lessonAux)
            if (index === array.length - 1) {
              res.status(200).send(theory)
            }
          })
        })
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

  router.post('/index/:lessonId/',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log(req.body)
    res.status(204).send()
  })

  router.put('/index/:lessonId/:sectionId',
  login.ensureLoggedIn(),
  (req, res) => {
    console.log(req.body)
    res.status(200).send("ASD")
  })

  app.use('/', router)
}
