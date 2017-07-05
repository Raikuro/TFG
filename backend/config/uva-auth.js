let mysqlConnection = require('../src/mysqlConnection')

class UvaUser {
  constructor (username, pass, isAlumn) {
    this.username = username
    this.pass = pass
    this.isAlumn = isAlumn
  }

  static getCollegeUser (username, pass) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM uvaUsers WHERE username = ? AND password = ?', [username, pass],
      (err, uvaUsers) => {
        if (err) { reject(null) }
        if (uvaUsers[0]) {
          resolve(new UvaUser(username, pass, uvaUsers[0].isAlumn))
        } else { resolve(null) }
      })
    })
  }
}

module.exports = exports = UvaUser
