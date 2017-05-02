module.exports = (app, mysqlConnection) => {
  // Allow to receive petitions from another host
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', require('../config/client').ADDRESS)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE')
    next()
  })

  let login = require('../src/core/ensureLogin')
  let routes = require('./routes')(app, login)
  let theoryRoutes = require('../src/theory/routes')(app, login, mysqlConnection)
}
