import { Question } from "app/theory/core/question";

export class Section {
  private _title: String;
  private _id: Number;
  private _content: String;
  private _keywords: String[];
  private _questions: Question[];

  get id(){
    return this._id;
  }

  set id(id){
    this._id = id;
  }

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

  get questions(){
    return this.questions;
  }
}