let Section = require('./section')
let TestQuestions = require('./testQuestion')
let mysqlConnection = require('../core/mysqlConnection')

class Lesson {
  constructor (id, title, sections, testQuestions) {
    this.sections = sections || []
    this.title = title
    this.id = id
    this.testQuestions = testQuestions || []
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
      mysqlConnection.query('SELECT S.id, S.title FROM sections S WHERE S.lesson = ?', [this.id], (err, sections) => {
        if (err) { reject(err) }
        sections = sections.map((section) => {
          return new Section(section.id, section.title)
        })
        resolve(sections)
      })
    })
  }

  getTestQuestions () {
    return new Promise((resolve, reject) => {
      if (this.testQuestions.length > 0) {
        resolve(this.testQuestions)
      } else {
        mysqlConnection.query('SELECT DISTINCT T.* FROM testQuestions T WHERE T.lesson = ?',
        [this.id], (err, questions) => {
          if (err) { reject(err) }
          let optionsAux = []
          questions = questions.map((question) => {
            question = new TestQuestions(question.id, question.wording)
            optionsAux.push(question.getAllOptions())
            return question
          })
          Promise.all(optionsAux).then((optionsArray) => {
            optionsArray.forEach((options, index) => {
              questions[index].setOptions(options)
            })
            resolve(questions)
          }).catch((err) => reject(err))
        })
      }
    })
  }

  setTestQuestions (questions) {
    this.testQuestions = questions
  }

  setSections (sections) {
    this.sections = sections
  }

}
module.exports = exports = Lesson
