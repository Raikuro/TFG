let UvaAuth = require('../../config/uva-auth')
exports.authenticate = () => {
  return (req, res, next) => {
    UvaAuth.getCollegeUser(req.body.username, req.body.password)
    .then((user) => {
      if (user) {
        req.session.isAlumn = user.isAlumn
        next()
      } else { res.status(401).send({error: 'User or password is incorrect'}) }
    }).catch((err) => { res.status(500).send({error: err}) })
  }
}
