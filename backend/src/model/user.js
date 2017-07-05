let mysqlConnection = require('../mysqlConnection')

class User {
  constructor (username, isAlumn) {
    this.username = username
  }

  save () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO users(username) VALUES (?)',
      [this.username], (err, res) => {
        if (err) { reject(err) }
        resolve(this)
      })
    })
  }

  static findByUsername (username, cb) {
    process.nextTick(() => {
      mysqlConnection.query('SELECT * FROM users WHERE username = ?', [username],
        (err, users) => {
          if (err) { return cb(err) }
          if (users && users.length > 0) {
            cb(null, new User(users[0].username))
          } else {
            new User(username).save()
              .then((res) => { cb(null, res) })
              .catch((err) => { return cb(err) })
          }
        }
      )
    })
  }
}
module.exports = exports = User
