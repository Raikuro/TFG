class User {
  constructor (username, isAlumn) {
    this.username = username
    this.isAlumn = isAlumn
  }

  static findByUsername (username, cb) {
    process.nextTick(() => {
      let records = User._getUserList()
      for (var i = 0, len = records.length; i < len; i++) {
        var record = records[i]
        if (record.username === username) {
          return cb(null, record)
        }
      }
      return cb(null, null)
    })
  }

  static _getUserList () {
    return [
      {
        username: 'asd', displayName: 'yopasd'
      },
      {
        username: 'qwe', displayName: 'yopqwe'
      }
    ]
  }
}
module.exports = exports = User
