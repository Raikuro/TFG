let mysqlConnection = require('../mysqlConnection')
class Question {

  constructor (title, contentText, contentImage, user, responseText, responseImage, reported, ignored, date) {
    this.user = user
    this.title = title
    this.contentText = contentText
    this.contentImage = contentImage
    this.date = date
    this.responseText = responseText
    this.responseImage = responseImage
    this.reported = reported
    this.ignored = ignored
  }

  static getQuestionsByUserId (user) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM questions WHERE user = ?', [user], (err, questions) => {
        if (err) { reject(err) } else {
          resolve(questions.map((question) => {
            if (question.contentImage) {
              question.contentImage = new Buffer(question.contentImage).toString('base64')
            }
            return new Question(question.title, question.contentText, question.contentImage, question.user, question.responseText, question.responseImage, question.reported, question.ignored, question.date)
          }))
        }
      })
    })
  }

  static delete (questionTitle, sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM questions WHERE section = ? AND title = ?',
      [sectionId, questionTitle], (err, questions) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }
  
  addResponse () {
    if (this.date === undefined) { this.date = new Date() }
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    let dataArray = []
    let query = 'UPDATE questions SET '
    if (this.responseText) {
      query += 'responseText = ?,'
      dataArray.push(this.responseText)
    }
    if (this.responseImage) {
      query += 'responseImage = ? '
      dataArray.push(this.responseImage)
    } else {
      query = query.replace(',', ' ')
    }
    query += 'WHERE user = ? AND dateOfQuestion = ? AND title = ? AND contentText '
    dataArray = dataArray.concat([this.user, formatedMysqlString, this.title])
    if (this.contentText) {
      query += '= ? AND '
      dataArray.push(this.contentText)
    } else {
      query += 'IS NULL AND '
    }
    query += 'contentImage '
    if (this.contentImage) {
      query += '= ?'
      dataArray.push(this.contentImage)
    } else {
      query += 'IS NULL'
    }
    return new Promise((resolve, reject) => {
      mysqlConnection.query(query, dataArray, (err, questions) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }

  static getUnresponded () {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT DISTINCT Q.*, S.title as sTitle, S.id as sId FROM questions Q, sections S WHERE Q.responseText IS NULL AND Q.responseImage IS NULL AND Q.reported IS NOT TRUE AND Q.ignored IS NOT TRUE AND Q.section = S.id',
      (err, questions) => {
        if (err) { reject(err) } else {
          resolve(questions.map((question) => {
            if (question.contentImage) {
              question.contentImage = new Buffer(question.contentImage).toString('base64')
            }
            if (question.responseImage) {
              question.responseImage = new Buffer(question.responseImage).toString('base64')
            }
            return {
              'associatedSection': {'title': question.sTitle, 'id': question.sId},
              'question': new Question(question.title, question.contentText, question.contentImage, question.user, question.responseText, question.responseImage, question.reported, question.ignored, question.dateOfQuestion)
            }
          }))
        }
      })
    })
  }

  static ignore (questionTitle, sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE questions SET ignored=true WHERE section = ? AND title = ?',
      [sectionId, questionTitle], (err, questions) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }

  static report (questionTitle, sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE questions SET reported=true WHERE section = ? AND title = ?',
      [sectionId, questionTitle], (err, questions) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }

}

module.exports = exports = Question
