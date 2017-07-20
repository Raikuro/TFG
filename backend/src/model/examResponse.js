let mysqlConnection = require('../mysqlConnection')
let TestOption = require('./testOption')

class ExamResponse {
  constructor (id, selected, testOption) {
    this.id = id
    this.selected = selected
    this.testOption = testOption
  }

  static transformTestIntoExam (origin, solved) {
    return new ExamResponse(undefined, origin.isCorrect, solved)
  }

  isCorrect () {
    return this.selected === this.testOption.isCorrect
  }

  save (examQuestionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO examResponses(option, question, selected) VALUES (?,?,?);', [this.testOption.id, examQuestionId, this.selected], (err, insertLog) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }

  static getAllExamOptions (option) {
    let aux = new TestOption(option.answer, null)
    return new ExamResponse(undefined, false, aux)
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
