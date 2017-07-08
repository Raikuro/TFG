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
