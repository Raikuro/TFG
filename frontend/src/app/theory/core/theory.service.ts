import { Injectable } from '@angular/core';

import { Theory } from './theory';
import { Section } from './section';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response } from "@angular/http/";

import { ADDRESS } from 'app/config/server';

const ADD = 0;
const EDIT = 1;

@Injectable()
export class TheoryService {

  private headers;
  private options;
  private _index: Theory;
  private _sectionsCache;
  private _preparedData;

  constructor(private http: Http) {
    this._sectionsCache = new Array<Array<Section>>();
    this.headers = new Headers();
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  get index(){
    if(this._index === undefined){
      return this.getIndexData();
    }
    return this._index;
  }

  sendData(data){
    let body = new URLSearchParams();
    body.append('mode', data.mode);
    body.append('section', data.section);
    if(data.mode === ADD){
       return this.http.post(ADDRESS + '/index/' + data.theme.id + '/' + data.section.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
    if(data.mode === EDIT){
      return this.http.put(ADDRESS + '/index/' + data.theme.id + '/' + data.section.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
  }
  
  prepareData(mode, theme, section){
    this._preparedData = {
      'mode': mode,
      'theme': theme,
      'section': section
    }
  }

  get preparedData(){
    return this._preparedData;
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
    return this.http.get(ADDRESS + '/index/' + themeId + '/' + sectionId, this.options)
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
