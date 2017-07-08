let Exam = require('../../src/model/exam')

exports.checkExam = (req, res) => {
  let exam = JSON.parse(req.body.exam)
  exam.forEach((question) => {
    if (question.wordingImage) {
      question.wordingImage = question.wordingImage.replace(/ /g, '+')
    }
  })
  Exam.getResponseOfExam(exam, req.session.passport.user)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(500).send(error))
}

exports.getGeneralTest = (req, res) => {
  Exam.generateGeneralTest()
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getLessonTest = (req, res) => {
  let lessonId = JSON.parse(req.params.lessonId)
  Exam.generateLessonTest(lessonId)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getConceptTest = (req, res) => {
  let concept = req.params.concept
  Exam.generateConceptTest(concept)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}
