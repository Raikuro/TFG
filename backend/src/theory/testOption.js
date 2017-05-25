let mysqlConnection = require('../core/mysqlConnection')

class TestOption {
  constructor (answer, isCorrect) {
    this.answer = answer
    this.isCorrect = isCorrect
  }

  delete (questionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM testOptions WHERE question = ? AND answer = ?',
      [questionId, this.answer], (err) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  save (questionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO testOptions(question, answer, isCorrect) VALUES (?,?,?)',
        [questionId, this.answer, this.isCorrect], (err) => {
          if (err) { reject(err) }
          resolve()
        })
    })
  }

}

module.exports = exports = TestOption
