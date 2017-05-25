let TestQuestion = require('./testQuestion')
let TestOption = require('./testOption')

exports.saveNewQuestion = (req, res) => {
  console.log("---w", JSON.parse(req.body.question))
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
