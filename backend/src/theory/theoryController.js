let Theory = require('./theory')

exports.getIndex = (req, res) => {
  Theory.getIndex()
    .then((index) => { res.status(200).send(index) })
    .catch((e) => { res.status(500).send(e) })
}
