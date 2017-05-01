let mysqlConnection = require('../core/mysqlConnection')

class Keyword {
  constructor (word) {
    this.word = word
  }

  save () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM keywords WHERE keyword = ?', [this.word], (err, keyword) => {
        if (err) { reject(err) }
        if (keyword[0]) {
          resolve()
        } else {
          mysqlConnection.query('INSERT INTO keywords VALUES ("' + this.word + '");',
          (err) => {
            if (err) { reject(err) }
            resolve()
          })
        }
      })
    })
  }
}
module.exports = exports = Keyword
