module.exports = (app) => {

  //Allow to receive petitions from another host
  app.use(function(req, res, next) {
    clientAddress = require("../config/client");
    res.setHeader("Access-Control-Allow-Origin", clientAddress.IP + ":" + clientAddress.PORT);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
  });

  let login = require('connect-ensure-login');
  let routes = require('./routes')(app, login);
}


  

