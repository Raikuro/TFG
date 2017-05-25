export class TestOption {
  private _answer: String;
  private _isCorrect: Boolean;
  
  constructor(answer, isCorrect){
    this._answer = answer;
    this._isCorrect = isCorrect;
  }

  get answer(){
    return this._answer;
  }

  set answer(answer){
    this._answer = answer;
  }

  get isCorrect(){
    return this._isCorrect;
  }

  set isCorrect(isCorrect){
    this._isCorrect = isCorrect;
  }

  toJSON(){
    return { answer: this.answer, isCorrect: this.isCorrect}
  }
}