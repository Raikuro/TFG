let mysqlConnection = require('../mysqlConnection')
let TestOption = require('./testOption')

class ExamResponse {
  constructor (id, selected, testOption) {
    this.id = id
    this.selected = selected
    this.testOption = testOption
  }

  static save (question, examQuestionId) {
    return new Promise((resolve, reject) => {
      question.testOptions.forEach((testOption, i) => {
        mysqlConnection.query('SELECT id FROM testOptions WHERE question = ?;', [question.id], (err, ids) => {
          if (err) { reject(err) } else {
            mysqlConnection.query('INSERT INTO examResponses(option, question, selected) VALUES (?,?,?);', [ids[i].id, examQuestionId, testOption.isCorrect], (err, insertLog) => {
              if (err) { reject(err) } else { resolve() }
            })
          }
        })
      })
    })
  }

  static getResponseByQuestionId (questionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT R.id as rid, R.selected, O.* FROM examResponses R, testOptions O WHERE R.question = ? AND R.option = O.id;', [questionId], (err, responses) => {
        if (err) { reject(err) } else {
          responses = responses.map((response) => {
            return new ExamResponse(response.rid, response.selected, new TestOption(response.answer, response.isCorrect, response.id))
          })
          resolve(responses)
        }
      })
    })
  }
}
module.exports = exports = ExamResponse
