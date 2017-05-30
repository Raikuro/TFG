let TestQuestion = require('./testQuestion')
let TestOption = require('./testOption')

exports.saveNewQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  new TestQuestion(question.id, question.wording, question.testOptions).save()
  .then(res.status(204).send())
  .catch(error => res.status(500).send(error))
}

exports.updateQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  let options = JSON.parse(question.testOptions)
  options = options.map(option => {
    return new TestOption(option.answer, option.isCorrect)
  })
  new TestQuestion(question.id, question.wording, options).update()
  .then(res.status(204).send())
  .catch(error => res.status(500).send(error))
}

exports.deleteQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  let options = JSON.parse(question.testOptions)
  options = options.map(option => {
    return new TestOption(option.answer, option.isCorrect)
  })
  new TestQuestion(question.id, question.wording, options).delete()
  .then(res.status(204).send())
  .catch(error => res.status(500).send(error))
}

exports.getGeneralTest = (req, res) => {
  let size = JSON.parse(req.params.size)
  TestQuestion.generateGeneralTest(size)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getLessonTest = (req, res) => {
  let size = JSON.parse(req.params.size)
  let lessonId = JSON.parse(req.params.lessonId)
  TestQuestion.generateLessonTest(lessonId, size)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.getConceptTest = (req, res) => {
  let size = JSON.parse(req.params.size)
  let concept = req.params.concept
  TestQuestion.generateConceptTest(concept, size)
    .then(test => res.status(200).send(test))
    .catch(error => res.status(500).send(error))
}

exports.checkExam = (req, res) => {
  let exam = JSON.parse(req.body.exam)
  //console.log(exam)
  TestQuestion.checkExam(exam)
}
