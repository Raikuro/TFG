let theoryController = require('./theoryController')
let sectionController = require('./sectionController')
let questionController = require('./questionController')
let lessonController = require('./lessonController')
let testQuestionController = require('./testQuestionController')
let statisticsController = require('./statisticsController')
let examController = require('./examController')

module.exports = (app, login) => {
  let router = require('express').Router()

  router.get('/index',
    login.ensureLoggedIn(),
    theoryController.getIndex
  )

  router.get('/index/:lessonId/getTestQuestions',
    login.ensureLoggedIn(),
    lessonController.getLessonQuestions
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

  router.put('/question/report',
    login.ensureLoggedIn(),
    questionController.reportAQuestion
  )

  router.put('/question/ignore',
    login.ensureLoggedIn(),
    questionController.ignoreAQuestion
  )

  router.post('/question/respond',
    login.ensureLoggedIn(),
    questionController.respondAQuestion
  )

  router.get('/index/getTitles',
    login.ensureLoggedIn(),
    theoryController.getLessonsTitle
  )

  router.post('/testQuestion/:lessonId',
    login.ensureLoggedIn(),
    testQuestionController.saveNewQuestion
  )

  router.put('/testQuestion/:lessonId/:questionId',
    login.ensureLoggedIn(),
    testQuestionController.updateQuestion
  )

  router.delete('/testQuestion/:lessonId/:questionId',
    login.ensureLoggedIn(),
    testQuestionController.deleteQuestion
  )

  router.get('/test/concept/:concept',
    login.ensureLoggedIn(),
    examController.getConceptTest
    // testQuestionController.getConceptTest
  )

  router.get('/test/lesson/:lessonId',
    login.ensureLoggedIn(),
    examController.getLessonTest
    // testQuestionController.getLessonTest
  )

  router.get('/test',
    login.ensureLoggedIn(),
    // testQuestionController.getGeneralTest
    examController.getGeneralTest
  )

  router.post('/checkExam',
    login.ensureLoggedIn(),
    // testQuestionController.checkExam
    examController.checkExam
  )

  router.get('/statistics/:username',
    login.ensureLoggedIn(),
    statisticsController.getStatistics
  )

  app.use('/', router)
}
