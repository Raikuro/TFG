let theoryController = require('./theoryController')
let sectionController = require('./sectionController')
let questionController = require('./questionController')

module.exports = (app, login) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    theoryController.getIndex
  )

  router.get('/index/search/:query',
    login.ensureLoggedIn(),
    theoryController.search
  )

  router.get('/index/:lessonId/:sectionId',
    login.ensureLoggedIn(),
    sectionController.getSection
  )

  router.post('/index/:lessonId',
    login.ensureLoggedIn(),
    sectionController.saveNewSection
  )

  router.put('/index/:lessonId/:sectionId',
    login.ensureLoggedIn(),
    sectionController.updateSection
  )

  router.delete('/index/:lessonId/:sectionId',
    login.ensureLoggedIn(),
    sectionController.deleteSection
  )

  router.get('/questions/:lessonId/:sectionId',
    login.ensureLoggedIn(),
    sectionController.getSectionQuestions
  )

  router.post('/questions/:lessonId/:sectionId',
    login.ensureLoggedIn(),
    sectionController.addSectionQuestions
  )

  router.delete('/questions',
    login.ensureLoggedIn(),
    questionController.delete
  )

  router.get('/questions/unresponded',
    login.ensureLoggedIn(),
    questionController.getUnrespondedQuestions
  )

  router.post('/question/report',
    login.ensureLoggedIn(),
    questionController.reportAQuestion
  )

  router.post('/question/respond',
    login.ensureLoggedIn(),
    questionController.respondAQuestion
  )

  app.use('/', router)
}
