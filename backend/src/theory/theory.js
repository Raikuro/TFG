class Theory {
  constructor (themes) {
    this.themes = themes
  }

  set themes (themes) {
    this.themes = themes
  }
}

class Theme {
  constructor (name, id, sections) {
    this.name = name
    this.id = id
    this.sections = sections
  }

  set sections (sections) {
    this.sections = sections
  }
}

class Section {
  constructor (name, id) {
    this.name = name
    this.id = id
  }

  set name (name) {
    this.name = name
  }

  set id (id) {
    this.id = id
  }
}

exports.Theory = Theory
exports.Theme = Theme
exports.Section = Section
