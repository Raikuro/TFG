let UvaAuth = require('../../config/uva-auth')
exports.authenticate = () => {
  return (req, res, next) => {
    let user = UvaAuth.getCollegeUser(req.body.username, req.body.password)
    if (user) {
      req.session.isAlumn = user.isAlumn
      next()
    } else { res.status(401).send({error: 'User or password is incorrect'}) }
  }
}
