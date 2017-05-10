let Section = require('./section')
let Question = require('./question')

exports.getSection = (req, res) => {
  Section.getSection(req.params.sectionId)
    .then((section) => { res.status(200).send(section) })
    .catch((e) => { res.status(500).send(e) })
}

exports.getSectionsByKeyword = (req, res) => {
  Section.findByKeyword(req.params.query)
  .then((sections) => {
    res.status(200).send(sections)
  })
  .catch((e) => { res.status(500).send(e) })
}

exports.saveNewSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  new Section(section.id, section.title, section.content, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
}

exports.updateSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  new Section(section.id, section.title, section.content, section.keywords)
    .save(req.params.lessonId)
    .then(() => { res.status(204).send() })
    .catch((e) => { res.status(500).send(e) })
}

exports.deleteSection = (req, res) => {
  let section = JSON.parse(req.body.section)
  new Section(section.id, section.title, section.content, section.keywords)
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
    .then((section) => { res.status(200).send(section.questions) })
    .catch((e) => { res.status(500).send(e) })
}

exports.addSectionQuestions = (req, res) => {
  Section.getSection(req.params.sectionId).then((section) => {
    let question = JSON.parse(req.body.question)
    question = new Question(question._title, question._content, question._username)
    section.addQuestion(question)
      .then(() => { res.status(204).send() })
      .catch((e) => { res.status(500).send(e) })
  })
}
