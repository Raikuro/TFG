class User {
  constructor (username, isAlumn) {
    this.username = username
    this.isAlumn = isAlumn
  }

  static findByUsername (username, cb) {
    process.nextTick(() => {
      let user = User._getUserList().find((user) => {
        return user.username === username
      })
      return user !== [] ? cb(null, user) : cb(null, null)
    })
  }

  static _getUserList () {
    return [new User('asd', 'yopasd'), new User('qwe', 'yopqwe')]
  }
}
module.exports = exports = User
