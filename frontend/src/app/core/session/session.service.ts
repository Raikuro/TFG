import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CookieService } from 'ngx-cookie';

import { Session } from './session';

import { ADDRESS } from '../../config/server';

@Injectable()
export class SessionService {

  private headers = new Headers();
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private _session: Session;

  get session(){
    if(this._session === undefined){
      if(this.cookieService.get("session")){
        return this.getSessionInformation();
      }
    }
    return this._session;
  }

  updateSession(session: Session){
    this._session = session;
  }
  
  constructor(private http: Http, private cookieService:CookieService) { }

  login(username, password): Observable<Session> {
    let body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    return this.http.post(ADDRESS + '/login', body, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')});
  }

  logout(){
    return new Promise((resolve, reject)=>{
      this.updateSession(undefined);
      this.cookieService.remove("session");
      this.http.get(ADDRESS + '/logout', this.options)
      .subscribe(
        resolve,
        reject
      );
    });
  }

  private getSessionInformation(){
    return this.http.get(ADDRESS + '/session', this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }  
}
