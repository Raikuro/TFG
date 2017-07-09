let TestOption = require('./testOption')
let utils = require('../utils/utils')
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
          return new TestOption(option.answer, option.isCorrect, option.id)
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

  _updateOptions () {
    return new Promise((resolve, reject) => {
      this.getAllOptions().then(actual => {
        actual.map((option) => {
          return new TestOption(actual.answer, actual.isCorrect)
        })
        let needToAdd = utils.diffBtwOptionsArrays(this.testOptions, actual)
        let needToDel = utils.diffBtwOptionsArrays(actual, this.testOptions)
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
    return new Promise((resolve, reject) => {
      this._saveBasics(lessonId).then((id) => {
        let optionsPromises = this.testOptions.map((option) => {
          return new TestOption(option.answer, option.isCorrect).save(id)
        })
        Promise.all(optionsPromises).then(() => resolve()).catch((err) => reject(err))
      }).catch(err => reject(err))
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
