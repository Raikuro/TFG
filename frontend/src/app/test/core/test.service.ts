import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response, URLSearchParams } from "@angular/http/";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ADDRESS } from 'app/config/server';
import { EDIT, ADD, DELETE } from "app/core/utils/const";
import { TestQuestion } from "app/theory/core/testQuestion";
import { TestOption } from "app/theory/core/testOption";
import { BaseService } from "app/core/service/baseService";

@Injectable()
export class TestService extends BaseService{

  //private headers;
  //private options;

  private _data;
  private _confirmationData;

  private _examResult;

  private _test: TestQuestion[]

  constructor(http: Http) {
    super(http);
    /*this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });*/
  }

  /*private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  }*/

  getQuestions(lessonId){
    return this.http.get(ADDRESS + '/index/' + lessonId + '/getTestQuestions', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  set confirmationData(data){
    this._confirmationData = data
  }

  get confirmationData(){
    return this._confirmationData
  }

  set data (data){
    this._data = data;
  }

  sendData(question, mode, lessonId){
    let body = new URLSearchParams();
    body.append('question', JSON.stringify(question));

    if(mode === ADD){
      return this.http.post(ADDRESS + '/testquestion/' + lessonId, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
    }
    if(mode === EDIT){
      return this.http.put(ADDRESS + '/testquestion/' + lessonId + '/' + question.id, body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
    }
    if(mode === DELETE){
      let optionAux = this.options;
      optionAux.body = body
      return this.http.delete(ADDRESS + '/testquestion/' + lessonId + '/' + question.id, optionAux)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
    }
  }

  get data(){
    /*let aux = this.data;
    this.data = undefined;
    return aux;*/
    return this._data
  }

  prepareTestByConcept(concept, size){
    return this._saveTest(
      this.http.get(ADDRESS + '/test/concept/' + concept + '/' + size, this.options)
        .map(this.extractData)
        .catch((error:any) => {
          return Observable.throw(this.extractError(error) || 'Server error')}
      )
    )
  }

  prepareTestByLesson(lessonId, size){
    return this._saveTest(
      this.http.get(ADDRESS + '/test/lesson/' + lessonId + '/' + size, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')}
      )
    )
  }

  prepareTestGeneral(size){
    return this._saveTest(
      this.http.get(ADDRESS + '/test/' + size, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')}
      )
    )
  }

  get test(){
    return this._test;
  }

  private _saveTest(test){
    return new Promise((resolve, reject) => {
      test.subscribe(
        questionList => {
          this._test = questionList.map(question => {
            let options = question.testOptions.map(
              option => {return new TestOption(option.answer, false)}
            );
            return new TestQuestion(question.id, question.wordingText, question.wordingImage, options);
          })
          resolve();
        },
        error => reject(error)
      )
    })
  }

  saveExamForConfirmation(test){
    this._test = test
  }

  checkExam(){
    let body = new URLSearchParams();
    body.append('exam', JSON.stringify(this._test));

    return this.http.post(ADDRESS + '/checkExam', body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

  saveResult(result){
    this._examResult = result;
  }

  getCorrectedData(){
    this._test = undefined;
    return this._examResult
  }

}
