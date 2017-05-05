import { Injectable } from '@angular/core';

import { Theory } from './theory';
import { Section } from './section';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response, URLSearchParams} from "@angular/http/";

import { ADDRESS } from 'app/config/server';

const ADD = 0;
const EDIT = 1;
const DELETE = 2;

@Injectable()
export class TheoryService {

  private headers;
  private options;
  private _index: Theory;
  private _sectionsCache;
  private _preparedData;
  private _searchCache;

  constructor(private http: Http) {
    this._sectionsCache = new Array<Array<Section>>();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._searchCache = {}
    
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  get index(){
    if(this._index === undefined){
      return this.getIndexData();
    }
    return this._index;
  }

  set index(index){
    this._index = <Theory>index;
  }

  search(query){
    if(!this._searchCache[query]){
      return this.http.get(ADDRESS + '/index/search/' + query, this.options)
        .map(this.extractData)
        .catch((error:any) => {
          return Observable.throw(error.json().error || 'Server error')})
    }
    return this._searchCache[query];
  }

  deleteIndexCache(){
    this._index = undefined
  }

  deleteSectionsCache(){
    this._sectionsCache = undefined
  }

  deleteSearchCache(){
    this._searchCache = undefined
  }

  deleteTheoryCache(){
    return new Promise((resolve, reject) => {
      this.deleteSearchCache();
      this.deleteIndexCache();
      this.deleteSectionsCache();
      resolve(true)
    })
  }

  sendData(data){
    let body = new URLSearchParams();
    body.append('section', JSON.stringify(data.section));

    if(data.mode === ADD){
      return this.http.post(ADDRESS + '/index/' + data.lesson.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
    if(data.mode === EDIT){
      return this.http.put(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }

    if(data.mode === DELETE){
      this.options.body = body
      return this.http.delete(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
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
        console.log(error)
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  } 
}
