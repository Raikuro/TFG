let mysqlConnection = require('../mysqlConnection')
let Keyword = require('./keyword')
let utils = require('../utils/utils')

class Section {
  constructor (id, title, contentText, contentImage, keywords, questions) {
    this.title = title
    this.id = id
    this.contentText = contentText
    this.contentImage = contentImage
    this.keywords = keywords
    this.questions = questions
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
      // let keyAux = this.keywords.split ? this.keywords.split(',') : this.keywords
      this._getKeywords(this.id).then((keywords) => {
        // console.log(keywords, keyAux)
        let words = keywords.map((keyword) => { return keyword.word })
        let wordsAux = this.keywords.map((keyword) => { return keyword.word })
        Promise.all([
          utils._diffBtwKeywordArrays(words, wordsAux).map((keyword) => {
            return this._deleteKeyRelation(keyword)
          }),
          utils._diffBtwKeywordArrays(wordsAux, words).map((word) => {
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
      mysqlConnection.query('INSERT INTO sections(lesson, title, contentText, contentImage) VALUES (?,?,?,?)',
      [lessonId, this.title, this.contentText, this.contentImage], (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.insertId)
        }
      })
    })
  }

  _updateBasics (lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE sections SET lesson=?, title=?, contentText=?, contentImage=? WHERE id=?',
      [lessonId, this.title, this.contentText, this.contentImage, this.id], (err, keyword) => {
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
        keywords = keywords.map((element) => { return new Keyword(element.keyword) })
        resolve(keywords)
      })
    })
  }

  _add (lessonId) {
    return new Promise((resolve, reject) => {
      this._addBasics(lessonId).then((id) => {
        if (this.keywords) {
          let keyAux = this.keywords.split ? this.keywords.split(',') : this.keywords
          Promise.all(
            keyAux.map((keyword) => {
              return new Keyword(keyword).save(id)
            })
          ).then(() => { resolve() })
          .catch((err) => { reject(err) })
        }
        resolve()
      })
    })
  }

  save (lessonId) {
    console.log("-->", this)
    return this.id ? this._update(lessonId) : this._add(lessonId)
  }

  delete () {
    return new Promise((resolve, reject) => {
      Promise.all([this._deleteAllKeyRelations(), this._deleteAllQuestions()])
        .then(() => {
          this._deleteBasics()
            .then(() => resolve())
            .catch((err) => reject(err))
        }).catch((err) => reject(err))
    })
  }

  _deleteAllQuestions () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM questions WHERE section = ?', [this.id],
        (err) => {
          if (err) { reject(err) }
          resolve()
        })
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
      Promise.all(
        this.keywords.map((keyword) => {
          return this._deleteKeyRelation(keyword)
        })
      ).then(() => resolve())
      .catch((err) => reject(err))
    })
  }

  /*
  static findByKeyword (keyword, lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        'SELECT DISTINCT S.* FROM keywordRelations K, sections S WHERE K.section = S.id AND S.lesson = ? AND K.keyword LIKE ?',
        [lessonId, keyword + '%'], (err, sections) => {
          if (err) { reject(err) } else {
            let auxSections = []
            if (sections[0]) {
              sections.map((section, i, arr) => {
                return new Promise((resolve, reject) => {
                  section = new Section(section.id, section.title, section.contentText, section.contentImage)
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
        }
      )
    })
  }
  */

  static findByKeyword (keyword, lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        'SELECT DISTINCT S.id FROM keywordRelations K, sections S WHERE K.section = S.id AND S.lesson = ? AND K.keyword LIKE ?',
        [lessonId, keyword + '%'], (err, sections) => {
          if (err) { reject(err) } else {
            if (sections[0]) {
              let promises = sections.map((sectionData) => {
                return Section.getSection(sectionData.id)
              })
              Promise.all(promises)
                .then((sections) => { console.log(sections); resolve(sections) })
                .catch((err) => reject(err))
            } else { resolve([]) }
          }
        }
      )
    })
  }

  _getQuestions () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT U.username, Q.dateOfQuestion, Q.section, Q.title, Q.contentText, Q.contentImage, Q.responseText, Q.responseImage, Q.ignored, Q.reported ' +
      'FROM questions Q, sections S, users U WHERE Q.section = ? AND  U.id = Q.user',
      [this.id], (err, questions) => {
        if (err) { reject(err) } else {
          questions = questions.map((question) => {
            if (question.contentImage) {
              question.contentImage = new Buffer(question.contentImage).toString('base64')
            }
            if (question.responseImage) {
              question.responseImage = new Buffer(question.responseImage).toString('base64')
            }
            return question
          })
          resolve(questions)
        }
      })
    })
  }

  static getSection (sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.title, S.contentText, S.contentImage FROM sections S WHERE S.id = ?',
      [sectionId], (err, section) => {
        if (err) { reject(err) } else {
          if (section[0].contentImage) {
            section[0].contentImage = new Buffer(section[0].contentImage).toString('base64')
          }
          let sectionAux = new Section(sectionId, section[0].title, section[0].contentText, section[0].contentImage)
          Promise.all([sectionAux._getKeywords(), sectionAux._getQuestions()])
            .then((values) => {
              sectionAux.keywords = values[0]
              sectionAux.questions = values[1]
              resolve(sectionAux)
            })
            .catch((err) => reject(err)
          )
        }
      })
    })
  }

  addQuestion (question) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT U.id FROM users U WHERE U.username = ?',
      [question.user], (err, result) => {
        if (err) { reject(err) } else {
          let userId = result[0].id
          if (question.responseText || question.responseImage) {
            mysqlConnection.query('INSERT INTO questions(user, section, title, contentText, contentImage, responseText, responseImage) VALUES (?,?,?,?,?,?,?)',
            [userId, this.id, question.title, question.contentText, question.contentImage, question.responseText, question.responseImage], (err, res) => {
              if (err) { reject(err) } else { resolve(res) }
            })
          } else {
            mysqlConnection.query('INSERT INTO questions(user, section, title, contentText, contentImage) VALUES (?,?,?,?,?)',
            [userId, this.id, question.title, question.contentText, question.contentImage], (err, res) => {
              if (err) { reject(err) } else { resolve(res) }
            })
          }
        }
      })
    })
  }

}
module.exports = exports = Section
