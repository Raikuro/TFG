import { Injectable } from '@angular/core';
import { RequestOptions, Http, Response } from "@angular/http/";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ADDRESS } from 'app/config/server';

@Injectable()
export class TestService {

  private headers;
  private options;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  getLessonsTitle(){
    return this.http.get(ADDRESS + '/lessons', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        console.log(error)
        return Observable.throw(error.json().error || 'Server error')})
  }

  private extractData(res: Response) {
    return res['_body'] ? res.json() : {}
  } 

}
