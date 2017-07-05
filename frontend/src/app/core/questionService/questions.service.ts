import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response, URLSearchParams} from "@angular/http/";

import { ADDRESS } from 'app/config/server';
import { BaseService } from "app/core/service/baseService";


@Injectable()
export class QuestionsService extends BaseService{

  //private _options;
  //private _headers;
  private _preparedQuestion;

  constructor(http: Http) {
    /*this._headers = new Headers();
    this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._options = new RequestOptions({ headers: this._headers, withCredentials: true });*/
    super(http)
  }

  getQuestions(lessonId, sectionId){
    return this.http.get(ADDRESS + '/questions/' + lessonId + '/' + sectionId, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  /*private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  }

  private extractError(err: Response) {
    return err['_body'] ? err['_body'] : {}
  }*/

  prepareData(question){
    this._preparedQuestion = question
  }

  getPreparedData(){
    return this._preparedQuestion;
  }

  sendData(question, lessonId, sectionId){
    let body = new URLSearchParams();
    console.log(question)
    body.append('question', JSON.stringify(question));
    return this.http.post(ADDRESS + '/questions/' + lessonId + '/' + sectionId, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  deleteQuestion(questionTitle, sectionId){
    let body = new URLSearchParams();
    body.append('questionTitle', JSON.stringify(questionTitle));
    body.append('sectionId', JSON.stringify(sectionId));
    let optionAux = this.options;
    optionAux.body = body
    return this.http.delete(ADDRESS + '/questions/', optionAux)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  getUnrespondedQuestions(){
    return this.http.get(ADDRESS + '/questions/unresponded', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  reportQuestion(questionTitle, sectionId){
    let body = new URLSearchParams();
    body.append('questionTitle', JSON.stringify(questionTitle));
    body.append('sectionId', JSON.stringify(sectionId));
    return this.http.put(ADDRESS + '/question/report', body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  ignoreQuestion(questionTitle, sectionId){
    let body = new URLSearchParams();
    body.append('questionTitle', JSON.stringify(questionTitle));
    body.append('sectionId', JSON.stringify(sectionId));
    return this.http.put(ADDRESS + '/question/ignore', body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  setQuestion(question){
    console.log(JSON.stringify(question))
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));
    return this.http.post(ADDRESS + '/question/respond', body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

}
