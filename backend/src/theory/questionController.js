let Question = require('./question')

exports.delete = (req, res) => {
  let question = JSON.parse(req.body.question)
  new Question(question.title, question.content, question.username,
  question.response, question.reported, question.date).delete()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
}

exports.getUnrespondedQuestions = (req, res) => {
  Question.getUnresponded()
    .then((questions) => { res.status(200).send(questions) })
    .catch((err) => res.status(500).send(err))
}

exports.reportAQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  new Question(question.title, question.content, question.username,
  question.response, question.reported, question.date).report()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
}

exports.respondAQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  console.log(question)
  new Question(question.title, question.content, question.username,
  question.response, question.reported, question.date).addResponse()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
  //res.send("ASD")
}
