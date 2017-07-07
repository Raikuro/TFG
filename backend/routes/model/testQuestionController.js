let TestQuestion = require('../../src/model/testQuestion')
let TestOption = require('../../src/model/testOption')

exports.saveNewQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  if (question.wordingImage) {
    let bypassUrl = question.wordingImage.replace(/ /g, '+')
    question.wordingImage = Buffer.from(bypassUrl, 'base64')
  }
  new TestQuestion(question.id, question.wordingText, question.wordingImage, JSON.parse(question.testOptions)).save(req.params.lessonId)
  .then(res.status(204).send())
  .catch(error => { res.status(500).send(error) })
}

exports.updateQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  let options = JSON.parse(question.testOptions)
  options = options.map(option => {
    return new TestOption(option.answer, option.isCorrect)
  })
  if (question.wordingImage) {
    let bypassUrl = question.wordingImage.replace(/ /g, '+')
    question.wordingImage = Buffer.from(bypassUrl, 'base64')
  }
  new TestQuestion(question.id, question.wordingText, question.wordingImage, options).update()
  .then(res.status(204).send())
  .catch(error => res.status(500).send(error))
}

exports.deleteQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  let options = JSON.parse(question.testOptions)
  options = options.map(option => {
    return new TestOption(option.answer, option.isCorrect)
  })
  if (question.wordingImage) {
    let bypassUrl = question.wordingImage.replace(/ /g, '+')
    question.wordingImage = Buffer.from(bypassUrl, 'base64')
  }
  new TestQuestion(question.id, question.wordingText, question.wordingImage, options).delete()
  .then(res.status(204).send())
  .catch(error => res.status(500).send(error))
}

exports.getGeneralTest = (req, res) => {
  TestQuestion.generateGeneralTest()
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getLessonTest = (req, res) => {
  let lessonId = JSON.parse(req.params.lessonId)
  TestQuestion.generateLessonTest(lessonId)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getConceptTest = (req, res) => {
  let concept = req.params.concept
  TestQuestion.generateConceptTest(concept)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.checkExam = (req, res) => {
  let exam = JSON.parse(req.body.exam)
  exam.forEach((question) => {
    if (question.wordingImage) {
      question.wordingImage = question.wordingImage.replace(/ /g, '+')
    }
  })
  TestQuestion.getResponseOfExam(exam, req.session.passport.user)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(500).send(error))
}
