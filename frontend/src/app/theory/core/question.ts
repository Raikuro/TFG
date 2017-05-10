export class Question {

  private _title: String;
  private _username: String;
  private _content: String;
  private _date: Date

  get content(){
    return this._content
  }

  get title(){
    return this._title
  }

  constructor(title, username, content, date){
    this._title = title;
    this._username = username;
    this._content = content;
    this._date = date
  }
  
}