exports.authenticate = () => {
  return (req, res, next) => {
    let user = require('../../config/uva-auth').getCollegeUser(req.body.username, req.body.password)
    if (user) {
      req.session.isAlumn = user.isAlumn
      next()
    } else { res.status(401).send({error: 'User or password is incorrect'}) }
  }
}
