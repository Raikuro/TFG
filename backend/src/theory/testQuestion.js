let TestOption = require('./testOption')
let mysqlConnection = require('../core/mysqlConnection')

class TestQuestion {
  constructor (id, wording, testOptions) {
    this.id = id
    this.wording = wording
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
      mysqlConnection.query('UPDATE testQuestions SET wording=? WHERE id=?',
        [this.wording, this.id], (err) => {
          if (err) { reject(err) }
          resolve()
        })
    })
  }

  _diffBtwArrays (arr1, arr2) {
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
        let needToAdd = this._diffBtwArrays(this.testOptions, actual)
        let needToDel = this._diffBtwArrays(actual, this.testOptions)
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

  save (lessonId) {
    return new Promise((resolve, reject) => {
      this.testOptions.save(this.id).then(
        mysqlConnection.query('INSERT INTO testQuestions(lesson, wording) VALUES (?,?)',
        [lessonId, this.wording], (err) => {
          if (err) { reject(err) }
          resolve()
        })
      ).catch(error => reject(error))
    })
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

}

module.exports = exports = TestQuestion
