class Section {
  constructor (id, title, content, keywords) {
    this.title = title
    this.id = id
    this.content = content
    this.keywords = keywords
  }
  save (lessonId) {
    console.log('Salvando ' + this.title + ' en ' + lessonId)
  }
}
module.exports = Section
