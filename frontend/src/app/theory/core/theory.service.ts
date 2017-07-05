import { Injectable } from '@angular/core';

import { Theory } from 'app/core/model/theory';
import { Section } from 'app/core/model/section';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response, URLSearchParams } from "@angular/http/";

import { ADDRESS } from 'app/config/server';
import { ADD, EDIT, DELETE } from "app/core/utils/const";
import { BaseService } from "app/core/service/baseService";

@Injectable()
export class TheoryService extends BaseService{

  //private headers;
  //private options;
  private _index: Theory;
  private _sectionsCache;
  private _preparedData;
  private _searchCache;

  constructor(http: Http) {
    super(http)
    /*this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });*/
    this._sectionsCache = new Array<Array<Section>>();
    this._searchCache = {}
  }

  deletePreparedData(){
    this.preparedData = undefined
  }

  getLessonsTitle(){
    return this.http.get(ADDRESS + '/index/getTitles', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(this.extractError(error) || 'Server error')})
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
          return Observable.throw(this.extractError(error) || 'Server error')})
    }
    return this._searchCache[query];
  }

  deleteIndexCache(){
    this._index = undefined
  }

  deleteSectionsCache(){
    this._sectionsCache = new Array<Array<Section>>();
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
        return Observable.throw(this.extractError(error) || 'Server error')})
    }
    if(data.mode === EDIT){
      return this.http.put(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
    }

    if(data.mode === DELETE){
      let optionAux = this.options;
      optionAux.body = body
      return this.http.delete(ADDRESS + '/index/' + data.lesson.id + '/' + data.section.id, optionAux)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
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

  set preparedData(data){
    this._preparedData = data;
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
        return this._getSectionData(lessonId, sectionId);
       }
    }
    else{
      this.sectionsCache[lessonId] = new Array<Section>();
      return this._getSectionData(lessonId, sectionId);
    }
    return this._sectionsCache[lessonId][sectionId];
  }
  
  private _getSectionData(lessonId: number, sectionId: number):Observable<Section>{
    return this.http.get(ADDRESS + '/index/' + lessonId + '/' + sectionId, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  private getIndexData():Observable<Theory>{
    return this.http.get(ADDRESS + '/index', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  /*private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  } */
}
