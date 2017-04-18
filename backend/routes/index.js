module.exports = (app) => {

  let login = require('connect-ensure-login');

  let routes = require('./routes')(app, login);
}


  

