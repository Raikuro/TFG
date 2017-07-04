let mysqlConnection = require('../core/mysqlConnection')

class Keyword {
  constructor (word) {
    this.word = word
  }

  save (sectionId) {
    return new Promise((resolve, reject) => {
      if (this.word !== '') {
        mysqlConnection.query('INSERT INTO keywords VALUES (?)', [this.word],
        (err) => {
          if (err) { reject(err) } else {
            this._saveKeyRelation(sectionId)
              .then(() => { resolve() })
              .catch((err) => reject(err))
          }
        })
      }
    })
  }

  _saveKeyRelation (sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO keywordRelations VALUES (?,?)', [sectionId, this.word],
      (err) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

}
module.exports = exports = Keyword
