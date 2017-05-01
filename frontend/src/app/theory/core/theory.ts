import { Lesson } from './lesson'

export class Theory{
  private _lessons: Lesson[];

  get lessons(){
    return this._lessons;
  }
}
