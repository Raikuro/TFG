import { TestOption } from "app/theory/core/testOption";

export class TestQuestion {
  private _wording: String;
  private _testOptions: TestOption[]
  private _id: Number;

  get testOptions(): TestOption[]{
    return this._testOptions;
  }

  set testOptions(testOptions){
    this._testOptions = testOptions
  }

  get id(){
    return this._id;
  }

  set id(id){
    this._id = id;
  }

  get wording(){
    return this._wording;
  }

  set wording(wording){
    this._wording = wording
  }

  constructor(id, wording, testOptions){
    this._wording = wording;
    this._testOptions =  testOptions ? testOptions : [];
    this._id = id;
  }

  toJSON(){
    return { id: this.id, wording: this.wording, testOptions: JSON.stringify(this.testOptions)}
  }
}