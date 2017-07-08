let mysqlConnection = require('../mysqlConnection')
let ExamQuestion = require('./examQuestion')
let User = require('./user')
let consts = require('../utils/consts')

class Exam {
  constructor (user, examQuestions, id) {
    this.id = id
    this.user = user
    this.examQuestions = examQuestions
  }

  static _generateTest (questionList) {
    let result = []
    return new Promise((resolve, reject) => {
      questionList = questionList.map(question => {
        return ExamQuestion.getExamQuestion(question)
      })
      for (let i = 0; i < consts.EXAMSIZE && questionList.length > 0; i++) {
        let aux = Math.floor(Math.random() * questionList.length)
        result.push(questionList[aux])
        questionList.splice(aux, 1)
      }
      let promises = result.map(question => {
        return question.getAllExamOptions()
      })
      Promise.all(promises).then((optionsList) => {
        optionsList.forEach((options, i) => {
          result[i].examResponses = options
        })
        resolve(result)
      })
    })
  }

  static generateGeneralTest () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions', (err, questionList) => {
        if (err) { reject(err) }
        Exam._generateTest(questionList)
         .then((test) => resolve(test))
         .catch((err) => { reject(err) })
        // questionList = questionList.map(question => {
        //   return ExamQuestion.getExamQuestion(question)
        // })
        // for (let i = 0; i < consts.EXAMSIZE && questionList.length > 0; i++) {
        //   let aux = Math.floor(Math.random() * questionList.length)
        //   result.push(questionList[aux])
        //   questionList.splice(aux, 1)
        // }
        // let promises = result.map(question => {
        //   console.log(question)
        //   return question.getAllExamOptions()
        // })
        // Promise.all(promises).then((optionsList) => {
        //   optionsList.forEach((options, i) => {
        //     result[i].examResponses = options
        //     console.log(result[i].examResponses)
        //   })
        //   resolve(result)
        // })
      })
    })
  }

  static generateLessonTest (lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions WHERE lesson = ?', [lessonId],
      (err, questionList) => {
        if (err) { reject(err) }
        Exam._generateTest(questionList)
         .then((test) => resolve(test))
         .catch((err) => { reject(err) })
      })
    })
  }

  static generateConceptTest (concept) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions ' +
      'WHERE wordingText REGEXP \'([[:blank:][:punct:]]|^)' + concept + '([[:blank:][:punct:]]|$)\'',
      (err, questionList) => {
        if (err) { reject(err) }
        Exam._generateTest(questionList)
         .then((test) => resolve(test))
         .catch((err) => { reject(err) })
      })
    })
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
        let mark = exam.getMark()
        exam.save()
          .then(() => resolve({'mark': mark, 'exam': exam}))
          .catch((err) => reject(err))
      }).catch(error => reject(error))
    })
  }

  getMark () {
    let mark = this.examQuestions
      .map((examQuestion) => { return examQuestion.mark() })
      .reduce((last, actual) => { return actual + last })
    let realMark = ((mark * 10 / this.examQuestions.length) + 0.00000000000001).toFixed(2)
    return Math.max(realMark, 0)
  }
}

module.exports = exports = Exam
