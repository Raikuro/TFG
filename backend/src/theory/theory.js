let Lesson = require('./lesson')
let mysqlConnection = require('../core/mysqlConnection')

class Theory {
  constructor (lessons) {
    if (lessons) {
      this.lessons = lessons
    } else {
      this.lessons = []
    }
  }

  static getIndex () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { throw err }
        let lessonAux = []
        lessons.map((lesson, index, array) => {
          Lesson.getAllSections(lesson.id).then(sections => {
            lessonAux.push(new Lesson(lesson.id, lesson.title, sections))
            if (index === array.length - 1) {
              resolve(new Theory(lessonAux))
            }
          })
        })
      })
    })
  }

}
module.exports = exports = Theory
