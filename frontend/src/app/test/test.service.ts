import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response, URLSearchParams } from "@angular/http/";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ADDRESS } from 'app/config/server';
import { EDIT, ADD, DELETE } from "app/core/utils/const";

@Injectable()
export class TestService {

  private headers;
  private options;

  private data;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  getLessonsTitle(){
    return this.http.get(ADDRESS + '/index/getTitles', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  }

  getQuestions(lessonId){
    return this.http.get(ADDRESS + '/index/' + lessonId + '/getTestQuestions', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(error.json().error || 'Server error')})
  }

  saveData(data){
    this.data = data;
  }

  sendData(question, mode, lessonId){
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));

    if(mode === ADD){
      return this.http.post(ADDRESS + '/testquestion/' + lessonId, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
    if(mode === EDIT){
      return this.http.put(ADDRESS + '/testquestion/' + lessonId + '/' + question.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
    if(mode === DELETE){
      let optionAux = this.options;
      optionAux.body = body
      return this.http.delete(ADDRESS + '/testquestion/' + lessonId + '/' + question.id, optionAux)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
    }
  }

  getData(){
    let aux = this.data;
    this.data = undefined;
    return aux;
  }


}
