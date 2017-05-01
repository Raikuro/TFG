class Lesson {
  constructor (id, title, sections) {
    if (sections) {
      this.sections = sections
    } else {
      this.sections = []
    }
    this.title = title
    this.id = id
  }
}
module.exports = Lesson
