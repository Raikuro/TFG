let Theory = require('../../src/model/theory')

exports.getIndex = (req, res) => {
  Theory.getIndex()
    .then((index) => { res.status(200).send(index) })
    .catch((e) => { res.status(500).send(e) })
}

exports.search = (req, res) => {
  Theory.search(req.params.query)
    .then((result) => { res.status(200).send(result) })
    .catch((e) => { res.status(500).send(e) })
}

exports.getLessonsTitle = (req, res) => {
  Theory.getLessonsTitle()
    .then((result) => { res.status(200).send(result) })
    .catch((e) => { res.status(500).send(e) })
}

exports.getTestQuestions = (req, res) => {
  Theory.getTestQuestions()
    .then((result) => { res.status(200).send(result) })
    .catch((e) => { res.status(500).send(e) })
}
