exports.getUser = (req, res) => {
  res.send({username: req.session.passport.user, isAlumn: req.session.isAlumn})
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.status(204).send()
  })
}
