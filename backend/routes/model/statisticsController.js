let User = require('../../src/model/user')
let Question = require('../../src/model/question')
let Exam = require('../../src/model/exam')
let Record = require('../../src/model/record')

exports.getStatistics = (req, res) => {
  User.findByUsername(req.params.username, (err, user) => {
    if (err) { res.status(500).send(err) } else {
      Promise.all([_getQuestions(user.id), _getRecords(user.id), _getExams(user.id)])
        .then(([questions, records, exams]) => {
          let data = {
            'questions': questions,
            'exams': exams,
            'records': records
          }
          res.status(200).send(data)
        }).catch((err) => res.status(500).send(err))
    }
  })
}

function _getQuestions (userId) {
  return new Promise((resolve, reject) => {
    Question.getQuestionsByUserId(userId)
      .then((questions) => { resolve(questions) })
      .catch((err) => reject(err))
  })
}

function _getRecords (userId) {
  return new Promise((resolve, reject) => {
    Record.getRecordsByUserId(userId)
      .then((records) => { resolve(records) })
      .catch((err) => reject(err))
  })
}

function _getExams (userId) {
  return new Promise((resolve, reject) => {
    Exam.getExamsByUserId(userId)
      .then((exams) => { resolve(exams) })
      .catch((err) => reject(err))
  })
}
