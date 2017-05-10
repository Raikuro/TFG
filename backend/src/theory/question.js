let mysqlConnection = require('../core/mysqlConnection')
class Question {

  constructor (title, content, username, date) {
    this.username = username
    this.title = title
    this.content = content
    this.date = date
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
              console.log(auxUser, formatedMysqlString, this.title, this.content)
              if (err) { reject(err) }
              resolve()
            })
        })
    })
  }
}

module.exports = exports = Question
