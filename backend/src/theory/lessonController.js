let Lesson = require('./lesson')

exports.getLessonQuestions = (req, res) => {
  new Lesson(req.params.lessonId).getTestQuestions()
    .then((questions) => { res.status(200).send(questions) })
    .catch((err) => res.status(500).send(err))
}
