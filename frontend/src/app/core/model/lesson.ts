import { Section } from './section'
import { TestQuestion } from "./testQuestion";

export class Lesson{
  private _title: String;
  private _sections: Section[];
  private _testQuestions: TestQuestion[];

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

  get testQuestion(){
    return this._testQuestions
  }

}