let TestOption = require('./testOption')
let mysqlConnection = require('../mysqlConnection')

class TestQuestion {
  constructor (id, wordingText, wordingImage, testOptions) {
    this.id = id
    this.wordingText = wordingText
    this.wordingImage = wordingImage
    this.testOptions = testOptions
  }

  getAllOptions () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT T.* FROM testOptions T WHERE T.question = ?',
      [this.id], (err, options) => {
        if (err) { reject(err) }
        options = options.map((option) => {
          return new TestOption(option.answer, option.isCorrect)
        })
        resolve(options)
      })
    })
  }

  getAllOptionsForExam () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT T.answer FROM testOptions T WHERE T.question = ?',
      [this.id], (err, options) => {
        if (err) { reject(err) }
        options = options.map((option) => {
          return new TestOption(option.answer, option.isCorrect)
        })
        resolve(options)
      })
    })
  }

  setOptions (options) {
    this.testOptions = options
  }

  update (lessonId) {
    return new Promise((resolve, reject) => {
      Promise.all([this._updateBasics(), this._updateOptions()]).then(
        resolve(this)
      )
    })
  }

  _updateBasics () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE testQuestions SET wordingText=?, wordingImage=? WHERE id=?',
        [this.wordingText, this.wordingImage, this.id], (err) => {
          if (err) { reject(err) }
          resolve()
        })
    })
  }

  static _diffBtwOptionArrays (arr1, arr2) {
    return arr1.filter(e1 => {
      return !arr2.some(e2 => {
        return JSON.stringify({answer: e2.answer, isCorrect: e2.isCorrect}) ===
        JSON.stringify({answer: e1.answer, isCorrect: e1.isCorrect})
      })
    })
  }

  _updateOptions () {
    return new Promise((resolve, reject) => {
      this.getAllOptions().then(actual => {
        actual.map((option) => {
          return new TestOption(actual.answer, actual.isCorrect)
        })
        let needToAdd = TestQuestion._diffBtwOptionsArrays(this.testOptions, actual)
        let needToDel = this._diffBtwOptionsArrays(actual, this.testOptions)
        let promisesDel = needToDel.map((option) => {
          return new TestOption(option.answer, option.isCorrect).delete(this.id)
        })
        Promise.all(promisesDel).then(() => {
          let promisesAdd = needToAdd.map((option) => {
            return new TestOption(option.answer, option.isCorrect).save(this.id)
          })
          Promise.all(promisesAdd).then(resolve()).catch(error => reject(error))
        }).catch(error => reject(error))
      })
    })
  }

  _saveBasics (lessonId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO testQuestions(lesson, wordingText, wordingImage) VALUES (?,?,?)',
        [lessonId, this.wordingText, this.wordingImage], (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res.insertId)
          }
        }
      )
    })
  }

  save (lessonId) {
    console.log(this, "@@@", lessonId)
    return new Promise((resolve, reject) => {
      this._saveBasics(lessonId).then((id) => {
        let optionsPromises = this.testOptions.map((option) => {
          return new TestOption(option.answer, option.isCorrect).save(id)
        })
        Promise.all(optionsPromises).then(() => resolve()).catch((err) => reject(err))
      }).catch(err => reject(err))
    })
    /*return new Promise((resolve, reject) => {
      this._saveBasics(lessonId).then((id) => {
        //console.log("A", this.testOptions)
        //let optionsPromises = this.testOptions.map((testOption) => { console.log(testOption, "&&"); return testOption.save(id) })
        //Promise.all(optionsPromises).then(() => resolve()).catch((err) => reject(err))
        resolve()
      }).catch(error => reject(error))
    })*/
  }

  delete () {
    return new Promise((resolve, reject) => {
      let deleteOptions = this.testOptions.map((option) => {
        return option.delete(this.id)
      })
      Promise.all(deleteOptions).then(
        this._deleteBasics().then(resolve()).catch(error => reject(error))
      ).catch(error => reject(error))
    })
  }

  _deleteBasics () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM testQuestions WHERE id = ?',
      [this.id], (err) => {
        if (err) { reject(err) }
        resolve()
      })
    })
  }

  static generateGeneralTest (size) {
    let result = []
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions', (err, questionList) => {
        if (err) { reject(err) }
        questionList = questionList.map(question => {
          if (question.wordingImage) {
            question.wordingImage = new Buffer(question.wordingImage).toString('base64')
          }
          return new TestQuestion(question.id, question.wordingText, question.wordingImage)
        })
        for (let i = 0; i < size && questionList.length > 0; i++) {
          let aux = Math.floor(Math.random() * questionList.length)
          result.push(questionList[aux])
          questionList.splice(aux, 1)
        }
        let promises = result.map(question => {
          return question.getAllOptionsForExam()
        })
        Promise.all(promises).then((optionsList) => {
          optionsList.forEach((options, i, arr) => {
            result[i].testOptions = options
          })
          resolve(result)
        })
      })
    })
  }

  static generateLessonTest (lessonId, size) {
    let result = []
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions WHERE lesson = ?', [lessonId],
      (err, questionList) => {
        if (err) { reject(err) }
        questionList = questionList.map(question => {
          if (question.wordingImage) {
            question.wordingImage = new Buffer(question.wordingImage).toString('base64')
          }
          return new TestQuestion(question.id, question.wordingText, question.wordingImage)
        })
        for (let i = 0; i < size && questionList.length > 0; i++) {
          let aux = Math.floor(Math.random() * questionList.length)
          result.push(questionList[aux])
          questionList.splice(aux, 1)
        }
        let promises = result.map(question => {
          return question.getAllOptionsForExam()
        })
        Promise.all(promises).then((optionsList) => {
          optionsList.forEach((options, i, arr) => {
            result[i].testOptions = options
          })
          resolve(result)
        })
      })
    })
  }

  static generateConceptTest (concept, size) {
    let result = []
    size = 5
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT * FROM testQuestions ' +
      'WHERE wordingText REGEXP \'([[:blank:][:punct:]]|^)' + concept + '([[:blank:][:punct:]]|$)\'',
      (err, questionList) => {
        if (err) { reject(err) }
        questionList = questionList.map(question => {
          if (question.wordingImage) {
            question.wordingImage = new Buffer(question.wordingImage).toString('base64')
          }
          return new TestQuestion(question.id, question.wordingText, question.wordingImage)
        })
        for (let i = 0; i < size && questionList.length > 0; i++) {
          let aux = Math.floor(Math.random() * questionList.length)
          result.push(questionList[aux])
          questionList.splice(aux, 1)
        }
        let promises = result.map(question => {
          return question.getAllOptionsForExam()
        })
        Promise.all(promises).then((optionsList) => {
          optionsList.forEach((options, i, arr) => {
            result[i].testOptions = options
          })
          resolve(result)
        })
      })
    })
  }

  static getResponseOfExam (exam) {
    return new Promise((resolve, reject) => {
      let origin = exam.map((question) => {
        let options = JSON.parse(question.testOptions).map((option) => {
          return new TestOption(option.answer, option.isCorrect)
        })
        return new TestQuestion(question.id, question.wordingText, question.wordingImage, options)
      })

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

      /* let markPromises = origin.map((questionAux) => {
        return questionAux.getAllOptions().then(solution => {
          return questionAux.mark(solution)
        }).catch(error => console.log("B", error))
      }) */

      /* Promise.all(markPromises).then(marks => {
        console.log(marks)
        let mark = marks.reduce((last, actual) => { return last + actual }) * 10 / exam.length
        resolve(Math.max(0, mark), origin)
        //return Math.max(0, result)
      }) */
    })
  }

  mark (solution) {
    let nOfAnswers = solution.length
    let nOfFails = 0
    let responded = 0
    this.testOptions.forEach((option, i) => {
      if (option.isCorrect !== solution[i].isCorrect) {
        nOfFails++
      }
      responded += option.isCorrect
    })
    if (responded < 1) { return 0 }
    if (nOfFails === 0) { return 1 }
    let nOfCorrect = nOfAnswers - nOfFails
    if (nOfCorrect === 0) { return (1 - nOfAnswers) / nOfAnswers }
    return (nOfCorrect / nOfAnswers) - (Math.pow(nOfFails / nOfAnswers, (1 + 1 / nOfFails)))
  }
}

module.exports = exports = TestQuestion
