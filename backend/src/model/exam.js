let mysqlConnection = require('../mysqlConnection')
let ExamQuestion = require('./examQuestion')
let User = require('./user')

class Exam {
  constructor (user, examQuestions, id) {
    this.id = id
    this.user = user
    this.examQuestions = examQuestions
  }

  static getExamsByUserId (userId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM exams WHERE user = ?', [userId], (err, exams) => {
        if (err) { reject(err) } else {
          let promises = exams.map((exam) => {
            return ExamQuestion.getQuestionsByExamId(exam.id)
          })
          let examsAux = exams.map((exam) => {
            return new Exam(exam.user, undefined, exam.id)
          })
          Promise.all(promises).then((questions) => {
            let aux = examsAux.map((exams, i) => {
              exams.responses = questions[i]
              return exams
            })
            resolve(aux)
          }).catch((err) => reject(err))
        }
      })
    })
  }

  save () {
    return new Promise((resolve, reject) => {
      User.findByUsername(this.user, (err, user) => {
        if (err) { reject(err) } else {
          mysqlConnection.query('INSERT INTO exams(user) VALUES (?);', [user.id], (err, insertLog) => {
            if (err) { reject(err) } else {
              let examId = insertLog.insertId
              this.examQuestions.forEach((examQuestion) => {
                examQuestion.save(examId)
                  .then(() => resolve())
                  .catch((err) => reject(err))
              })
            }
          })
        }
      })
    })
  }

  static getExamsByUserExam (exam) {
    console.log(exam)
  }

  static getMark (origin, exam) {
    return new Promise((resolve, reject) => {
      let solutions = origin.map((questionAux) => {
        return questionAux.getAllOptions().then(solution => {
          return solution
        }).catch(error => reject(error))
      })

      Promise.all(solutions).then((solutions) => {
        let marks = solutions.map((solution, i) => {
          return origin[i].mark(solution)
        })
        let mark = marks.reduce((last, actual) => { return last + actual }) * 10 / exam.length
        let markErrorFix = (mark + 0.00000000000001).toFixed(2)
        resolve({'mark': Math.max(0, markErrorFix), 'origin': origin, 'solutions': solutions})
      }).catch(error => reject(error))
    })
  }

  static getResponseOfExam (originalExam, user) {
    return new Promise((resolve, reject) => {
      let promises = originalExam.map((testQuestion) => {
        return ExamQuestion.transformTestIntoExam(testQuestion)
      })
      Promise.all(promises).then((examQuestions) => {
        let exam = new Exam(user, examQuestions)
        exam.save()
        let mark = exam.getMark()
        resolve({'mark': mark, 'exam': exam})
      }).catch(error => reject(error))
    })
  }

  getMark () {
    let mark = this.examQuestions.map((examQuestion) => {
      return examQuestion.mark()
    }).reduce((last, actual) => { return actual + last })
    console.log("$", mark, "$")
    let realMark = ((mark * 10 / this.examQuestions.length) + 0.00000000000001).toFixed(2)
    return Math.max(realMark, 0)
  }
}

module.exports = exports = Exam
