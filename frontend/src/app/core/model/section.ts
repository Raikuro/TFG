import { Question } from "./question";
import { Keyword } from "./keyword";

export class Section {
  private _title: String;
  private _id: Number;
  private _contentText: String;
  private _contentImage: String;
  private _keywords: Keyword[];
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

  get contentText(){
    return this._contentText;
  }

  set contenText(contentText){
    this._contentText = contentText;
  }

  get contentImage(){
    return this._contentImage;
  }

  set contentImage(contentImage){
    this._contentImage = contentImage;
  }

  set keywords(keywords){
    this._keywords = keywords;
  }

  get questions(){
    return this.questions;
  }
}