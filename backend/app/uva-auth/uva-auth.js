exports.authenticate = () => {
  return function(req, res, next) {
    if(require('../../config/uva-auth').existAtCollege(req.body.username, req.body.password)){
      req.session.username = req.body.username;
      next();
    }
  }
}