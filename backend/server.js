let express = require('express')
let app = express()
let port = process.env.PORT || 3000

// CHARGE SESSION
let session = require('express-session')
// let flash = require('connect-flash')

let MySQLStore = require('express-mysql-session')(session)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 30 /* 30 mins */,
    httpOnly: false
  },
  name: 'session',
  store: new MySQLStore(require('./config/database'))
}))

// For logging and parsing
// app.use(require('morgan')('combined'))
app.use(require('body-parser').urlencoded({ extended: true }))

/*
//CHARGE LODASH
let _      = require('lodash');
_          = require('lodash/core');
let fp     = require('lodash/fp');
let array  = require('lodash/array');
let object = require('lodash/fp/object');
let at     = require('lodash/at');
let curryN = require('lodash/fp/curryN');
*/

// Segregate routes
let routes = require('./routes')(app)

// launch ======================================================================
app.listen(port, () => {
  console.log('Running at ' + port)
})
