let mysqlConnection = require('../core/mysqlConnection')
let Keyword = require('./keyword')

class Section {
  constructor (id, title, content, keywords) {
    this.title = title
    this.id = id
    this.content = content
    this.keywords = keywords
  }

  // TODO: SEGUIR AVANZANDO
  _update (lessonId) {
    return new Promise((resolve, reject) => {
      this.keywords.split(',').map((keyword) => {
        new Keyword(keyword).save().then(
          resolve()
        )
      })
    })
  }

  _add (lessonId) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  save (lessonId) {
    console.log('Salvando ' + this.title + ' en ' + lessonId)
    if (this.id) {
      return this._update(lessonId)
    } else {
      return this._add(lessonId)
    }
  }

  static getSection (sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.title, S.content FROM sections S WHERE S.id = ?', [sectionId], (err, section) => {
        if (err) { throw err }
        section = section[0]
        mysqlConnection.query('SELECT K.keyword FROM keywordRelations K WHERE K.section = ?', [sectionId], (err, keywords) => {
          if (err) { throw err }
          keywords = keywords.map((element) => { return element.keyword })
          resolve(new Section(sectionId, section.title, section.content, keywords))
        })
      })
    })
  }
}
module.exports = exports = Section
