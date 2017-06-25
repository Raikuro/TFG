let mysqlConnection = require('../core/mysqlConnection')
class Question {

  constructor (title, content, username, response, reported, ignored, date) {
    this.username = username
    this.title = title
    this.content = content
    this.date = date
    this.response = response
    this.reported = reported
    this.ignored = ignored
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

  ignore () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE questions SET ignored=true WHERE username = ? ' +
      'AND dateOfQuestion = ? AND title = ? AND content = ?',
      [this.username, formatedMysqlString, this.title, this.content], (err, questions) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  addResponse () {
    if (this.date === undefined) { this.date = new Date() }
    let starttime = new Date(this.date)
    console.log("1->", this.date, "2->", new Date(this.date), "3->", new Date())
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
      mysqlConnection.query('SELECT DISTINCT Q.*, S.title as sTitle, S.id as sId FROM questions Q, sections S WHERE Q.response IS NULL AND Q.reported IS NOT TRUE AND Q.ignored IS NOT TRUE AND Q.section = S.id',
      (err, questions) => {
        if (err) { reject(err) }
        resolve(questions.map((question) => {
          return {
            'associatedSection': {'title': question.sTitle, 'id': question.sId},
            'question': new Question(question.title, question.content, question.username, question.response, question.reported, question.ignored, question.dateOfQuestion)
          }
        }))
      })
    })
  }

}

module.exports = exports = Question
