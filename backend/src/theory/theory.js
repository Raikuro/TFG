let Lesson = require('./lesson')
let mysqlConnection = require('../core/mysqlConnection')

class Theory {
  constructor (lessons) {
    this.lessons = lessons || []
  }

  static search (query) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { reject(err) }
        let lessonAux = []
        Promise.all(lessons.map((lesson) => {
          lesson = new Lesson(lesson.id, lesson.title)
          return lesson.search(query).then(sections => {
            lesson.setSections(sections)
            if (lesson.sections.length > 0) {
              lessonAux.push(lesson)
            }
          }).catch((err) => reject(err))
        })).then((e) => resolve(new Theory(lessonAux)))
      })
    })
  }

  static getIndex () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { reject(err) }
        let sectionsAux = []
        lessons = lessons.map((lesson, index, array) => {
          lesson = new Lesson(lesson.id, lesson.title)
          sectionsAux.push(lesson.getAllSections())
          return lesson
        })
        Promise.all(sectionsAux).then((sectionsArray) => {
          sectionsArray.forEach((sections, index) => {
            lessons[index].setSections(sections)
          })
          resolve(new Theory(lessons))
        }).catch((err) => reject(err))
      })
    })
  }

  static getLessonsTitle () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT L.id, L.title FROM lessons L', (err, lessons) => {
        if (err) { reject(err) }
        lessons = lessons.map((lesson) => {
          return new Lesson(lesson.id, lesson.title)
        })
        resolve(new Theory(lessons))
      })
    })
  }

}
module.exports = exports = Theory
