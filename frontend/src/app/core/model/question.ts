export class Question {

  private _title: String;
  private _user: String;
  private _contentText: String;
  private _contentImage: String;
  private _date: Date;
  private _responseText: String;
  private _responseImage: String;

  get contentText(){
    return this._contentText;
  }

  get contentImage(){
    return this._contentImage;
  }

  set contentImage(image){
    this._contentImage = image
  }

  get title(){
    return this._title;
  }

  get responseText(){
    return this._responseText;
  }

  get responseImage(){
    return this._responseImage;
  }

  constructor(title, user, contentText, contentImage, responseText, responseImage, date){
    this._title = title;
    this._user = user;
    this._contentText = contentText;
    this._contentImage = contentImage;
    this._date = date;
    this._responseText = responseText;
    this._responseImage = responseImage;
  }
  
}