let Lesson = require('./lesson')
let mysqlConnection = require('../core/mysqlConnection')

class Theory {
  constructor (lessons) {
    this.lessons = lessons || []
  }

  static getIndex () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { reject(err) }
        let lessonAux = []
        lessons.map((lesson, index, array) => {
          lesson = new Lesson(lesson.id, lesson.title)
          lesson.getAllSections().then(sections => {
            lesson.setSections(sections)
            lessonAux.push(lesson)
            if (index === array.length - 1) { resolve(new Theory(lessonAux)) }
          }).catch((err) => reject(err))
        })
      })
    })
  }

}
module.exports = exports = Theory
