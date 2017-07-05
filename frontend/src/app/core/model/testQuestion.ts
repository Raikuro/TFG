import { TestOption } from "./testOption";

export class TestQuestion {
  private _wordingText: String;
  private _wordingImage;
  private _testOptions: TestOption[]
  private _id: Number;

  get wordingImage(){
    return this._wordingImage
  }

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

  get wordingText(){
    return this._wordingText;
  }

  set wordingText(wordingText){
    this._wordingText = wordingText
  }

  set wordingImage(wordingImage){
    this._wordingImage = wordingImage
  }

  constructor(id, wordingText, wordingImage, testOptions){
    this._wordingText = wordingText;
    this._wordingImage = wordingImage
    this._testOptions =  testOptions ? testOptions : [];
    this._id = id;
  }

  toJSON(){
    return { id: this.id, wordingText: this.wordingText, wordingImage: this.wordingImage, testOptions: JSON.stringify(this.testOptions)}
  }
}