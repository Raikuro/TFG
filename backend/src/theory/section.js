let mysqlConnection = require('../core/mysqlConnection')
let Keyword = require('./keyword')

class Section {
  constructor (id, title, content, keywords) {
    this.title = title
    this.id = id
    this.content = content
    this.keywords = keywords
  }

  _diffBtwArrays (arr1, arr2) {
    return arr1.filter((element) => {
      return arr2.indexOf(element) < 0
    })
  }

  _deleteKeyRelation (word) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM keywordRelations WHERE keyword = ? AND section = ?',
      [word, this.id], (err, keyword) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  _update (lessonId) {
    return new Promise((resolve, reject) => {
      let keyAux = this.keywords.split ? this.keywords.split(',') : this.keywords
      this._getKeywords(this.id).then((keywords) => {
        Promise.all([
          this._diffBtwArrays(keywords, keyAux).map((keyword) => {
            return this._deleteKeyRelation(keyword)
          }),
          this._diffBtwArrays(keyAux, keywords).map((word) => {
            return new Keyword(word).save(this.id)
          }),
          this._updateBasics(lessonId)
        ]).then(() => { resolve() })
        .catch(reason => { reject(reason) })
      })
    })
  }

  _addBasics (lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO sections(lesson, title, content) VALUES (?,?,?)',
      [lessonId, this.title, this.content], (err, res) => {
        if (err) { reject(err) }
        resolve(res.insertId)
      })
    })
  }

  _updateBasics (lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE sections SET lesson=?, title=?, content=? WHERE id=?',
      [lessonId, this.title, this.content, this.id], (err, keyword) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  _getKeywords () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT K.keyword FROM keywordRelations K WHERE K.section = ?',
      [this.id], (err, keywords) => {
        if (err) { reject(err) }
        keywords = keywords.map((element) => { return element.keyword })
        resolve(keywords)
      })
    })
  }

  _add (lessonId) {
    return new Promise((resolve, reject) => {
      this._addBasics(lessonId).then((id) => {
        if (this.keywords) {
          let keyAux = this.keywords.split ? this.keywords.split(',') : this.keywords
          keyAux.map((keyword) => {
            new Keyword(keyword).save(id)
            .then(() => { resolve() })
            .catch((err) => { reject(err) })
          })
        }
        resolve()
      })
    })
  }

  save (lessonId) {
    return this.id ? this._update(lessonId) : this._add(lessonId)
  }

  delete () {
    return new Promise((resolve, reject) => {
      this._deleteAllKeyRelations()
        .then(() => {
          this._deleteBasics()
            .then(() => resolve())
            .catch((err) => reject(err))
        }).catch((err) => reject(err))
    })
  }

  _deleteBasics () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM sections WHERE id = ?', [this.id],
      (err) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  _deleteAllKeyRelations () {
    return new Promise((resolve, reject) => {
      this.keywords.map((keyword, index, array) => {
        this._deleteKeyRelation(keyword)
          .then().catch((err) => reject(err))
        if (index === array.length - 1) { resolve() }
      })
    })
  }

  static findByKeyword (keyword) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        'SELECT S.* FROM keywordRelations K, sections S WHERE K.section = S.id AND K.keyword LIKE ?',
        [keyword + '%'], (err, sections) => {
          if (err) { reject(err) }
          let auxSections = []
          if (sections[0]) {
            sections.map((section, i, arr) => {
              return new Promise((resolve, reject) => {
                section = new Section(section.id, section.title, section.content)
                section._getKeywords().then((keywords) => {
                  section.keywords = keywords
                  auxSections.push(section)
                  if (i === arr.length - 1) { resolve(auxSections) }
                }).catch((err) => reject(err))
              }).then((result) => { resolve(result) })
              .catch((err) => { reject(err) })
            })
          } else { resolve(auxSections) }
        }
      )
    })
  }

  static getSection (sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.title, S.content FROM sections S WHERE S.id = ?',
      [sectionId], (err, section) => {
        if (err) { reject(err) }
        section = section[0]
        mysqlConnection.query('SELECT K.keyword FROM keywordRelations K WHERE K.section = ?',
        [sectionId], (err, keywords) => {
          if (err) { reject(err) }
          keywords = keywords.map((element) => { return element.keyword })
          let sectionAux = new Section(sectionId, section.title, section.content)
          sectionAux._getKeywords().then((keywords) => {
            sectionAux.keywords = keywords
            resolve(sectionAux)
          }).catch((err) => reject(err))
        })
      })
    })
  }
}
module.exports = exports = Section
