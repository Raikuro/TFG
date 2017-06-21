import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CookieService } from 'ngx-cookie';

import { Session } from '../session/session';

import { ADDRESS } from '../../config/server';

@Injectable()
export abstract class BaseService {
  private _headers;
  private _options;
  //private _session: Session;

  protected get headers() {
    return this.headers;
  }

  protected get options() {
    return this._options;
  }
  
  constructor(protected http: Http) {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._options = new RequestOptions({ headers: this._headers, withCredentials: true });
  }
  
  protected extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  protected extractError(err: Response) {

    /*if(err['_body']){
      return typeof(err['_body']) === 'object' ? JSON.stringify(err['_body']) : err['_body']
    }
    else{
      return {}
    }*/

    if ('_body' in err) {
      switch(typeof(err['_body'])) {
        case 'object':
          return JSON.stringify(err['_body'])
        default:
          return err['_body']
        }
      }

    return {}

    //return err['_body'] ? (typeof(err['_body']) === 'object' ? JSON.stringify(err['_body']) : err['_body']) : {}
  }  
}
