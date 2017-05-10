let Question = require('./question')

exports.delete = (req, res) => {
  let question = JSON.parse(req.body.question)
  new Question(question.title, question.content,
    question.username, question.dateOfQuestion).delete()
      .then(() => { console.log("ASD"); res.status(204).send() })
      .catch((err) => res.status(500).send(err))
}
