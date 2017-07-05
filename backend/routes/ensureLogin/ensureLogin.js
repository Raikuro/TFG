exports.ensureLoggedIn = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).send({error: 'Authentication is required'})
    }
  }
}
