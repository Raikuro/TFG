let mysql = require('mysql')
/*
let connection = mysql.createConnection(require('../../../config/database'))
connection.connect()
module.exports = connection
*/
handleDisconnect()
function handleDisconnect () {
  let connection = mysql.createConnection(require('../../../config/database'))
  connection.connect((err) => {
    if (err) {
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000)
    }
  })

  connection.on('error', (err) => {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect()
    } else { throw err }
  })
  module.exports = connection
}


