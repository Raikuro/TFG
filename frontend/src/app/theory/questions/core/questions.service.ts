import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RequestOptions, Headers, Http, Response, URLSearchParams} from "@angular/http/";

import { ADDRESS } from 'app/config/server';


@Injectable()
export class QuestionsService {

  private options;
  private headers;
  
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  getQuestions(lessonId, sectionId){
    return this.http.get(ADDRESS + '/questions/' + lessonId + '/' + sectionId, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  } 

}
