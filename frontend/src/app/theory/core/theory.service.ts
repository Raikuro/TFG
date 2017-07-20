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
  //private _sectionsCache;
  private _preparedData;
  //private _searchCache;

  constructor(http: Http) {
    super(http)
    /*this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });*/
    //this._sectionsCache = new Array<Array<Section>>();
    //this._searchCache = {}
  }

  deletePreparedData(){
    this.preparedData = undefined
  }

  getLessonsTitle(){
    return this.http.get(ADDRESS + '/index/getTitles', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }


  get index(){
      return this.getIndexData();
  }

  search(query){
   return this.http.get(ADDRESS + '/index/search/' + query, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
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

  getSection(lessonId: number, sectionId: number){
   return this._getSectionData(lessonId, sectionId);
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
        return Observable.throw(this.extractError(error) || 'Server error')})
  }
}
