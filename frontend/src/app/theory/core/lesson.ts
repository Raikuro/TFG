import { Section } from './section'

export class Lesson{
  private _title: String;
  private _sections: Section[];

  get title(){
    return this._title;
  }

  set title(title){
    this._title = title;
  }

  set sections(sections){
    this._sections = sections;
  }

  get sections(){
    return this._sections;
  }

}