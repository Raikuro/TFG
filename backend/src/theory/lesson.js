let Section = require('./section')
let mysqlConnection = require('../core/mysqlConnection')

class Lesson {
  constructor (id, title, sections) {
    if (sections) {
      this.sections = sections
    } else {
      this.sections = []
    }
    this.title = title
    this.id = id
  }

  static getAllSections (id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [id], (err, sections) => {
        if (err) { throw err }
        sections.map((section) => {
          section = new Section(section.id, section.title)
        })
        resolve(sections)
      })
    })
  }

}
module.exports = exports = Lesson
