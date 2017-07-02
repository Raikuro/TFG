let mysqlConnection = require('../core/mysqlConnection')
class Question {

  constructor (title, contentText, contentImage, username, responseText, responseImage, reported, ignored, date) {
    this.username = username
    this.title = title
    this.contentText = contentText
    this.contentImage = contentImage
    this.date = date
    this.responseText = responseText
    this.responseImage = responseImage
    this.reported = reported
    this.ignored = ignored
  }

  static delete (questionTitle, sectionId) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query('DELETE FROM questions WHERE section = ? AND title = ?',
      [sectionId, questionTitle], (err, questions) => {
        if (err) { reject(err) } else { resolve() }
      })
    })
  }

  /*
  delete () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT id from users where username = ?', [this.username],
        (err, username) => {
          if (err) { reject(err) }
          let auxUser = username[0].id
          let queryAux = 'DELETE FROM questions WHERE username = ? AND dateOfQuestion = ? ' +
            'AND title = ? AND contentText '
          queryAux += (this.contentText) ? '= ?' : 'IS NULL'
          queryAux += ' AND contentImage '
          queryAux += (this.contentImage) ? '= ?' : 'IS NULL'
          console.log(queryAux)
          if (this.contentText) {
            mysqlConnection.query(queryAux,
              [auxUser, formatedMysqlString, this.title, this.contentText, this.contentImage], (err) => {
                if (err) { reject(err) } else { resolve() }
              }
            )
          } else {
            mysqlConnection.query(queryAux,
              [auxUser, formatedMysqlString, this.title, this.contentImage], (err) => {
                if (err) { reject(err) } else { resolve() }
              }
            )
          }
        }
      )
    })
  }
  /*
  /*
  report () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    if (this.contentImage) {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET reported=true WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage = ?',
        [this.username, formatedMysqlString, this.title, this.contentText, this.contentImage], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET reported=true WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage IS NULL',
        [this.username, formatedMysqlString, this.title, this.contentText], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    }
  }
  */

  /*
  ignore () {
    let starttime = new Date(this.date)
    let isotime = new Date((new Date(starttime)).toISOString())
    let fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000))
    let formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ')
    if (this.contentImage) {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET ignored=true WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage = ?',
        [this.username, formatedMysqlString, this.title, this.contentText, this.contentImage], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET ignored=true WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage IS NULL',
        [this.username, formatedMysqlString, this.title, this.contentText], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    }
  }
  */

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
    query += 'WHERE username = ? AND dateOfQuestion = ? AND title = ? AND contentText '
    dataArray = dataArray.concat([this.username, formatedMysqlString, this.title])
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
    
    /*
    if (this.contentImage) {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET response = ? WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage = ?',
        [this.response, this.username, formatedMysqlString, this.title, this.contentText, this.contentImage], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('UPDATE questions SET response = ? WHERE username = ? ' +
        'AND dateOfQuestion = ? AND title = ? AND contentText = ? AND contentImage IS NULL',
        [this.response, this.username, formatedMysqlString, this.title, this.contentText], (err, questions) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    }
    */
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
              'question': new Question(question.title, question.contentText, question.contentImage, question.username, question.responseText, question.responseImage, question.reported, question.ignored, question.dateOfQuestion)
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
