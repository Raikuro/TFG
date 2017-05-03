class UvaUser {
  constructor (username, pass) {
    this.username = username
    this.pass = pass
  }

  static _getCollegeAlumns () {
    return [
      new UvaUser('asd', 'asd')
    ]
  }

  static _getCollegeTeachers () {
    return [new UvaUser('qwe', 'qwe')]
  }

  static getCollegeUser (user, pass) {
    let collegeUsers = UvaUser._getCollegeAlumns()
    let userFind = collegeUsers.find((element) => {
      return (element.username === user && element.pass === pass)
    })
    if (userFind) {
      userFind.isAlumn = true
    } else {
      collegeUsers = UvaUser._getCollegeTeachers()
      userFind = collegeUsers.find((element) => {
        return (element.username === user && element.pass === pass)
      })
      if (userFind) {
        userFind.isAlumn = false
      }
    }
    return userFind
  }
}

module.exports = exports = UvaUser
