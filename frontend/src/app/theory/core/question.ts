export class Question {

  private _title: String;
  private _username: String;
  private _content: String;
  private _date: Date;
  private _response: String;

  get content(){
    return this._content;
  }

  get title(){
    return this._title;
  }

  get response(){
    return this._response;
  }

  constructor(title, username, content, response, date){
    this._title = title;
    this._username = username;
    this._content = content;
    this._date = date;
    this._response = response;
  }
  
}