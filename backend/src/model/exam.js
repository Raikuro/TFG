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

  static save (exam, username) {
    return new Promise((resolve, reject) => {
      User.findByUsername(username, (err, user) => {
        if (err) { reject(err) } else {
          mysqlConnection.query('INSERT INTO exams(user) VALUES (?);', [user.id], (err, insertLog) => {
            if (err) { reject(err) } else {
              let examId = insertLog.insertId
              exam.forEach((question) => {
                ExamQuestion.save(examId, question)
                  .then(() => resolve())
                  .catch((err) => reject(err))
                /*
                mysqlConnection.query('INSERT INTO examQuestions(exam, question) VALUES (?,?);', [examId, question.id], (err, insertLog) => {
                  if (err) { reject(err) } else {
                    let examQuestionId = insertLog.insertId
                    question.testOptions.forEach((examOption, i) => {
                      mysqlConnection.query('SELECT id FROM testOptions WHERE question = ?;', [question.id], (err, ids) => {
                        if (err) { reject(err) } else {
                          console.log('a', ids[i].id, examQuestionId, examOption.isCorrect)
                          mysqlConnection.query('INSERT INTO examResponses(option, question, selected) VALUES (?,?,?);', [ids[i].id, examQuestionId, examOption.isCorrect], (err, insertLog) => {
                            if (err) { reject(err) } else { resolve() }
                          })
                        }
                      })
                    })
                  }
                })
                */
              })
            }
          })
        }
      })
    })
  }
}

module.exports = exports = Exam
