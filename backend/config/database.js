module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'userDB',
  password: 'passDB',
  database: 'TFG',
  typeCast: function castToBool (field, useDefaultTypeCasting) {
    if ((field.type === 'BIT') && (field.length === 1)) {
      return (field.buffer()[0] === 1)
    }
    return (useDefaultTypeCasting())
  }
}
