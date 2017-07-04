export class Keyword {
  private _word: String;

  get word(){
    return this._word
  }

  set word(word){
    this.word = word
  }

  constructor(word){
    this._word = word
  }

  toJSON(){
    return { word: this._word }
  }
}