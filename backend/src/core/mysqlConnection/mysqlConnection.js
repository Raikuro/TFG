let mysql = require('mysql')
let connection = mysql.createConnection(require('../../../config/database'))
connection.connect()
module.exports = connection
