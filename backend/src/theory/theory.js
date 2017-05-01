let Lesson = require('./lesson')
let Section = require('./section')

class Theory {
  constructor (lessons) {
    if (lessons) {
      this.lessons = lessons
    } else {
      this.lessons = []
    }
  }

  static getIndex (mysqlConnection) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { throw err }
        let theory = new Theory()
        lessons.map((lesson, index, array) => {
          let lessonAux = new Lesson(lesson.id, lesson.title)
          mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [lesson.id], (err, sections) => {
            if (err) { throw err }
            sections.map((section) => {
              lessonAux.sections.push(new Section(section.id, section.title))
            })
            theory.lessons.push(lessonAux)
            if (index === array.length - 1) {
              resolve(theory)
            }
          })
        })
      })
    })
  }

}
module.exports = exports = Theory
