import { Injectable } from '@angular/core';

import { Theory } from './theory';
import { Section } from './section';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response } from "@angular/http/";

import { ADDRESS } from '../config/server';

@Injectable()
export class TheoryService {

  private headers = new Headers();
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  private _index: Theory;

  private _sectionsCache = new Array<Array<Section>>();

  constructor(private http: Http) { }

  get index(){
    if(this._index === undefined){
      return this.getIndexData();
    }
    return this._index;
  }

  setIndex(index:Theory){
    this._index = index;
  }

  get sectionsCache(){
    return this._sectionsCache;
  }

  updateSectionsCache(sectionData: Section, themeId: number, sectionId: number){
    this._sectionsCache[themeId][sectionId] = sectionData;
  }

  getSection(themeId: number, sectionId: number){
    if(this._sectionsCache[themeId]){
      if(this._sectionsCache[themeId][sectionId] === undefined){
        return this.getSectionData(themeId, sectionId);
       }
    }
    else{
      this.sectionsCache[themeId] = new Array<Section>();
      return this.getSectionData(themeId, sectionId);
    }
    return this._sectionsCache[themeId][sectionId];
  }
  
  private getSectionData(themeId: number, sectionId: number):Observable<Section>{
    return this.http.get(ADDRESS + '/section/' + themeId + '/' + sectionId, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  private getIndexData():Observable<Theory>{
    return this.http.get(ADDRESS + '/index', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  } 
}
