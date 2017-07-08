let mysqlConnection = require('../mysqlConnection')

class Record {
  constructor (user, section, date) {
    this.section = section
    this.user = user
    this.date = date
  }

  static getRecordsByUserId (userId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT R.dateOf, S.* FROM sections S, records R WHERE R.user = ? AND S.id = R.section;', [userId], (err, records) => {
        if (err) { reject(err) } else {
          resolve(records)
        }
      })
    })
  }

  save () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO records(user, section) VALUES (?,?);', [this.user.id, this.section.id], (err) => {
        if (err) { reject(err) } else {
          resolve()
        }
      })
    })
  }
}
module.exports = exports = Record
