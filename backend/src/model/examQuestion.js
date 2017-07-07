let mysqlConnection = require('../mysqlConnection')
let ExamResponse = require('./examResponse')
let TestQuestion = require('./testQuestion')

class ExamQuestion {
  constructor (question, examResponses, id) {
    this.id = id
    this.examResponse = examResponses
    this.question = question
  }

  static save (examId, question) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO examQuestions(exam, question) VALUES (?,?);', [examId, question.id], (err, insertLog) => {
        if (err) { reject(err) } else {
          let examQuestionId = insertLog.insertId
          ExamResponse.save(question, examQuestionId)
            .then(() => resolve())
            .catch((err) => reject(err))
        }
      })
    })
  }

  static getQuestionsByExamId (examId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT EQ.id as eqid,Q.* FROM examQuestions EQ, testQuestions Q WHERE exam = ? AND EQ.question = Q.id;', [examId], (err, examQuestions) => {
        if (err) { reject(err) } else {
          let promises = examQuestions.map((examQuestion) => {
            return ExamResponse.getResponseByQuestionId(examQuestion.id)
          })
          let examQuestionsAux = examQuestions.map((examQuestion) => {
            let testQuestion = new TestQuestion(examQuestion.id, examQuestion.wordingText, examQuestion.wordingImage, undefined)
            return new ExamQuestion(testQuestion, undefined, examQuestion.equid)
          })
          //.then((responses) => {
            //  let testQuestion = new TestQuestion(examQuestion.id, examQuestion.wordingText, examQuestion.wordingImage, responses.testOptions)
            //  let aux = new ExamQuestion(testQuestion, responses, examQuestion.equid)
            //  console.log(aux)
            //  return aux
          // })
        // })
          Promise.all(promises).then((responses) => {
            let aux = examQuestionsAux.map((examQuestion, i) => {
              examQuestion.responses = responses[i]
              return examQuestion
            })
            resolve(aux)
          }).catch((err) => reject(err))
        }
      })
    })
  }
}
module.exports = exports = ExamQuestion
