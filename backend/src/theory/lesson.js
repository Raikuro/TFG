let Section = require('./section')
let mysqlConnection = require('../core/mysqlConnection')

class Lesson {
  constructor (id, title, sections) {
    this.sections = sections || []
    this.title = title
    this.id = id
  }

  search (query) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [this.id], (err, sections) => {
        if (err) { reject(err) }
        Section.findByKeyword(query, this.id).then((result) => {
          resolve(result)
        })
      })
    })
  }

  getAllSections () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [this.id],(err, sections) => {
        if (err) { reject(err) }
        sections = sections.map((section) => {
          return new Section(section.id, section.title)
        })
        resolve(sections)
      })
    })
  }

  setSections (sections) {
    this.sections = sections
  }

}
module.exports = exports = Lesson
