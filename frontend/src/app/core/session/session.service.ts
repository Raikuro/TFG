import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { CookieService } from 'ngx-cookie';

import { Session } from './session';

import { ADDRESS } from '../../config/server';

@Injectable()
export class SessionService {
/*
  private _session: Session;

  get session(){
    if(this._session === undefined){
      if(this.cookieService.get("session")){
        this.getSessionInformation().subscribe(
          res => {
            return res;
          },
          error => {
            throw error;
          }
        );
      }
    }
    return this._session;
  }

  set session(session:Session){
    this._session = session;
  }

  

  private getSessionInformation(){
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(ADDRESS + '/session', options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  constructor(private http: Http, private cookieService:CookieService) { }

  login(username, password): Observable<Session> {

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    let body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    return this.http.post(ADDRESS + '/login', body, options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')});
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
*/

  /*private _session: Promise<Session>;

  get session(){
    if(this._session === undefined){
      if(this.cookieService.get("session")){
        return this.getSessionInformation().toPromise();
      }
    }
    return this._session;
  }

  set session(session:Promise<Session>){
    this._session = session;
  }
  
  private getSessionInformation(){
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(ADDRESS + '/session', options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')})
  }

  constructor(private http: Http, private cookieService:CookieService) { }

  login(username, password): Observable<Session> {

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    let body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    return this.http.post(ADDRESS + '/login', body, options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'Server error')});
  }

  login2(username, password): Promise<Session> {

    return this.login(username, password).toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }*/

  private headers = new Headers();
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private _session: Observable<Session>;

  get session(){
    if(this._session === undefined){
      if(this.cookieService.get("session")){
        return this.getSessionInformation();
      }
    }
    return this._session;
  }

  set session(session:Observable<Session>){
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

/*  logout(){
    this.session = undefined;
    console.log("removed1");
    this.cookieService.remove("session");
    console.log("removed2");
    let observable = this.http.get(ADDRESS + '/logout', this.options)
      .map(this.extractData);
    observable.subscribe(
        res => console.log(res),
        error => console.log(error))
  }
*/
  logout(){
    return new Promise((resolve, reject)=>{
      this.session = undefined;
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
