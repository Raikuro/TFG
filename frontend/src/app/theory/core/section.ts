export class Section{
  private _title: String;
  private id: Number;
  private _content: String;
  private _keywords: String[];

  get keywords(){
    return this._keywords;
  }

  get title(){
    return this._title;
  }

  get content(){
    return this._content;
  }

  set content(content){
    this._content = content;
  }

  set keywords(keywords){
    this._keywords = keywords;
  }
}