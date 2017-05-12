import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response, URLSearchParams} from "@angular/http/";

import { ADDRESS } from 'app/config/server';


@Injectable()
export class QuestionsService {

  private _options;
  private _headers;
  private _preparedQuestion;

  constructor(private http: Http) {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._options = new RequestOptions({ headers: this._headers, withCredentials: true });
  }

  getQuestions(lessonId, sectionId){
    return this.http.get(ADDRESS + '/questions/' + lessonId + '/' + sectionId, this._options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  }

  prepareData(question){
    this._preparedQuestion = question
  }

  getPreparedData(){
    return this._preparedQuestion;
  }

  sendData(question, lessonId, sectionId){
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));
    return this.http.post(ADDRESS + '/questions/' + lessonId + '/' + sectionId, body, this._options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  deleteQuestion(question){
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));
    let optionAux = this._options;
    optionAux.body = body
    return this.http.delete(ADDRESS + '/questions/', optionAux)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  getUnrespondedQuestions(){
    return this.http.get(ADDRESS + '/questions/unresponded', this._options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  reportQuestion(question){
    console.log(JSON.stringify(question))
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));
    return this.http.post(ADDRESS + '/questions/report', body, this._options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

}
