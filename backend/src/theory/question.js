let mysqlConnection = require('../core/mysqlConnection')
class Question {

  constructor (title, content, username, response, reported, date) {
    this.username = username
    this.title = title
    this.content = content
    this.date = date
    this.response = response
    this.reported = reported
  }

  delete () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT id from users where username = ?', [this.username],
        (err, username) => {
          if (err) { reject(err) }
          let auxUser = username[0].id
          mysqlConnection.query('DELETE FROM questions ' +
          'WHERE username = ? AND dateOfQuestion = ? AND title = ? AND content = ?',
          [auxUser, formatedMysqlString, this.title, this.content],
            (err) => {
              if (err) { reject(err) }
              resolve()
            })
        })
    })
  }

  report () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE questions SET reported=true WHERE username = ? ' +
      'AND dateOfQuestion = ? AND title = ? AND content = ?',
      [this.username, formatedMysqlString, this.title, this.content], (err, questions) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  addResponse () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE questions SET response = ? WHERE username = ? ' +
      'AND dateOfQuestion = ? AND title = ? AND content = ?',
      [this.response, this.username, formatedMysqlString, this.title, this.content], (err, questions) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  static getUnresponded () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM questions WHERE response IS NULL AND reported IS NOT TRUE',
      (err, questions) => {
        if (err) { reject(err) }
        resolve(questions.map((question) => {
          return new Question(question.title, question.content, question.username, question.response, question.reported, question.dateOfQuestion)
        }))
      })
    })
  }

}

module.exports = exports = Question
