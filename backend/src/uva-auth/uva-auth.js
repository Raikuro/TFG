exports.authenticate = () => {
  return function(req, res, next) {
    user = require('../../config/uva-auth').getCollegeUser(req.body.username, req.body.password);
    if(user){
      req.session.isAlumn = user.isAlumn;
      next();
    }
    else{
      res.status(401).send({error: "User or password is incorrect"});
    }
  }
}