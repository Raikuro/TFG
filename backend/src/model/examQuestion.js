let mysqlConnection = require('../mysqlConnection')
let ExamResponse = require('./examResponse')
let TestQuestion = require('./testQuestion')

class ExamQuestion {
  constructor (question, examResponses, id) {
    this.id = id
    this.examResponses = examResponses
    this.question = question
  }

  static transformTestIntoExam (testQuestion) {
    //console.log(testQuestion)
    return new Promise((resolve, reject) => {
      let question = new TestQuestion(testQuestion.id, testQuestion.wordingText, testQuestion.wordingImage)
      question.getAllOptions().then((options) => {
        //console.log(options)
        question.testOptions = options
        let testOptions = JSON.parse(testQuestion.testOptions)
        let examResponses = options.map((option, i) => {
          return ExamResponse.transformTestIntoExam(testOptions[i], option)
        })
        let aux = new ExamQuestion(question, examResponses)
        resolve(aux)
        // question.testOptions = options
        // options.map((option) => {
        //   let examResponses = ExamResponse.transformTestIntoExam(testQuestion.testOptions, options)
        //   //console.log(question, '-->', testQuestion.testOptions)
        //   let aux = new ExamQuestion(question, examResponses)
        //   console.log(aux)
        // })
      })
    })
  }

  save (examId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO examQuestions(exam, question) VALUES (?,?);', [examId, this.question.id], (err, insertLog) => {
        if (err) { reject(err) } else {
          let examQuestionId = insertLog.insertId
          this.examResponses.map((examResponse) => {
            examResponse.save(examQuestionId)
            .then(() => resolve())
            .catch((err) => reject(err))
          })
        }
      })
    })
  }

  isResponded () {
    let aux = this.examResponses
      .map((examResponse) => { return examResponse.selected })
      .reduce((last, actual) => { return actual + last })
    return aux
  }

  _getMark () {
    let nOfAnswers = this.examResponses.length
    let nOfCorrects = this.examResponses.map((examResponse) => {
      return examResponse.isCorrect()
    }).reduce((last, actual) => { return actual + last })
    return -1 + (2 * nOfCorrects / nOfAnswers)
  }

  mark (solution) {
    let responded = 0
    if (this.isResponded()) {
      responded++
    }
    return responded === 0 ? 0 : this._getMark()
    
    /*let nOfAnswers = solution.length
    let nOfFails = 0
    let responded = 0
    this.testOptions.forEach((option, i) => {
      if (option.isCorrect !== solution[i].isCorrect) {
        nOfFails++
      }
      responded += option.isCorrect
    })
    if (responded < 1) { return 0 }
    return -1 + (2 * (nOfAnswers - nOfFails) / nOfAnswers)*/
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
          // .then((responses) => {
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
