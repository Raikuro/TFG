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
      console.log(ADDRESS + '/index/' + data.lesson.id);
      this.http.post(ADDRESS + '/index/' + data.lesson.id, body, this.options);
    }
    if(data.mode === EDIT){
      console.log(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id);
      this.http.put(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id, body, this.options);
    }
  }
  
  prepareData(mode, lesson, section){
    this._preparedData = {
      'mode': mode,
      'lesson': lesson,
      'section': section
    }
  }

  get preparedData(){
    return this._preparedData;
  }

  get sectionsCache(){
    return this._sectionsCache;
  }

  updateSectionsCache(sectionData: Section, lessonId: number, sectionId: number){
    this._sectionsCache[lessonId][sectionId] = sectionData;
  }

  getSection(lessonId: number, sectionId: number){
    if(this._sectionsCache[lessonId]){
      if(this._sectionsCache[lessonId][sectionId] === undefined){
        return this.getSectionData(lessonId, sectionId);
       }
    }
    else{
      this.sectionsCache[lessonId] = new Array<Section>();
      return this.getSectionData(lessonId, sectionId);
    }
    return this._sectionsCache[lessonId][sectionId];
  }
  
  private getSectionData(lessonId: number, sectionId: number):Observable<Section>{
    return this.http.get(ADDRESS + '/index/' + lessonId + '/' + sectionId, this.options)
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
