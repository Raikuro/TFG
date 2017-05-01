class Theory {
  constructor (lessons) {
    if (lessons) {
      this.lessons = lessons
    } else {
      this.lessons = []
    }
  }
}

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

class Section {
  constructor (id, title, content, keywords) {
    this.title = title
    this.id = id
    this.content = content
    this.keywords = keywords
  }
}

exports.Theory = Theory
exports.Lesson = Lesson
exports.Section = Section
