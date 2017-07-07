let Section = require('../../src/model/section')
let Question = require('../../src/model/question')
let Record = require('../../src/model/record')

exports.getSection = (req, res) => {
  Section.getSection(req.params.sectionId)
    .then((section) => {
      if (req.session.isAlumn) {
        saveRecord(section, req.user).then(() => {
          res.status(200).send(section)
        })
      } else { res.status(200).send(section) }
    })
    .catch((e) => { res.status(500).send(e) })
}

function saveRecord (section, user) {
  return new Record(user, section).save()
}

/*
exports.getSectionsByKeyword = (req, res) => {
  Section.findByKeyword(req.params.query)
  .then((sections) => {
    console.log("----2>", sections)
    res.status(200).send(sections)
  })
  .catch((e) => { res.status(500).send(e) })
}
*/

exports.saveNewSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  if (section.contentImage) {
    let bypassUrl = section.contentImage.replace(/ /g, '+')
    section.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  new Section(section.id, section.title, section.contentText, section.contentImage, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
}

exports.updateSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  if (section.contentImage) {
    let bypassUrl = section.contentImage.replace(/ /g, '+')
    section.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  new Section(section.id, section.title, section.contentText, section.contentImage, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
}

exports.deleteSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  if (section.contentImage) {
    let bypassUrl = section.contentImage.replace(/ /g, '+')
    section.contentImage = Buffer.from(bypassUrl, 'base64')
  }
  new Section(section.id, section.title, section.contentText, section.contentImage, section.keywords)
    .delete()
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
}

exports.getIndex = (req, res) => {
  Section.getSection(req.params.sectionId)
    .then((section) => { res.status(200).send(section) })
    .catch((e) => { res.status(500).send(e) })
}

exports.getSectionQuestions = (req, res) => {
  Section.getSection(req.params.sectionId)
    .then((section) => {
      res.status(200).send(section.questions.filter((question) => {
        return !(question.reported || question.ignored)
      }))
    }).catch((e) => { res.status(500).send(e) })
}

exports.addSectionQuestions = (req, res) => {
  Section.getSection(req.params.sectionId).then((section) => {
    let question = JSON.parse(req.body.question)
    if (question._contentImage) {
      let bypassUrl = question._contentImage.replace(/ /g, '+')
      question._contentImage = Buffer.from(bypassUrl, 'base64')
    }
    if (question._responseImage) {
      let bypassUrl = question._responseImage.replace(/ /g, '+')
      question._responseImage = Buffer.from(bypassUrl, 'base64')
    }
    question = new Question(question._title, question._contentText, question._contentImage, question._user, question._responseText, question._responseImage)
    section.addQuestion(question)
      .then(() => { res.status(204).send() })
      .catch((e) => { res.status(500).send(e) })
  })
}
