let Question = require('../../src/model/question')

exports.delete = (req, res) => {
  let questionTitle = JSON.parse(req.body.questionTitle)
  let sectionId = JSON.parse(req.body.sectionId)
  Question.delete(questionTitle, sectionId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send(err))
  /*
  let question = JSON.parse(req.body.question)
  if (question.contentImage) {
    let bypassUrl = question.contentImage.replace(/ /g, '+')
    question.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  if (question.responseImage) {
    let bypassUrl = question.responseImage.replace(/ /g, '+')
    question.responseImage = Buffer.from(bypassUrl, 'base64')
  }
  new Question(question.title, question.contentText, question.contentImage, question.username,
  question.responseText, question.responseImage, question.reported, question.ignored, question.dateOfQuestion).delete()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
  */
}

exports.getUnrespondedQuestions = (req, res) => {
  Question.getUnresponded()
    .then((questions) => { res.status(200).send(questions) })
    .catch((err) => res.status(500).send(err))
}

exports.reportAQuestion = (req, res) => {
  /*
  let question = JSON.parse(req.body.question)
  if (question.contentImage) {
    let bypassUrl = question.contentImage.replace(/ /g, '+')
    question.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  if (question.responseImage) {
    let bypassUrl = question.responseImage.replace(/ /g, '+')
    question.responseImage = Buffer.from(bypassUrl, 'base64')
  }
  new Question(question.title, question.contentText, question.contentImage, question.username,
  question.responseText, question.responseImage, question.reported, question.ignored, question.date).report()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
  */
  let questionTitle = JSON.parse(req.body.questionTitle)
  let sectionId = JSON.parse(req.body.sectionId)
  Question.report(questionTitle, sectionId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send(err))
}

exports.ignoreAQuestion = (req, res) => {
  /*
  let question = JSON.parse(req.body.question)
  if (question.contentImage) {
    let bypassUrl = question.contentImage.replace(/ /g, '+')
    question.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  if (question.responseImage) {
    let bypassUrl = question.responseImage.replace(/ /g, '+')
    question.responseImage = Buffer.from(bypassUrl, 'base64')
  }
  new Question(question.title, question.contentText, question.contentImage, question.username,
  question.responseText, question.responseImage, question.reported, question.ignored, question.date).ignore()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
  */
  let questionTitle = JSON.parse(req.body.questionTitle)
  let sectionId = JSON.parse(req.body.sectionId)
  Question.ignore(questionTitle, sectionId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send(err))
}

exports.respondAQuestion = (req, res) => {
  let question = JSON.parse(req.body.question)
  if (question.contentImage) {
    let bypassUrl = question.contentImage.replace(/ /g, '+')
    question.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  if (question.responseImage) {
    let bypassUrl = question.responseImage.replace(/ /g, '+')
    question.responseImage = Buffer.from(bypassUrl, 'base64')
  }
  new Question(question.title, question.contentText, question.contentImage, question.username,
  question.responseText, question.responseImage, question.reported, question.ignored, question.date).addResponse()
      .then(() => { res.status(204).send() })
      .catch((err) => res.status(500).send(err))
}
