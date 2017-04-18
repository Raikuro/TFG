import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Session } from './session'
import { SESSIONS } from './mock-sessions'

@Injectable()
export class SessionService {

  constructor(private http: Http) { }

  login = (username, password): Promise<Session> => {
    /*let session = SESSIONS.find((e) => {
      //console.log(e + '---' + username)
      return e.username === username;
    });
    if(session !== undefined){
      return Promise.resolve(session);
    }
    else{
      return Promise.reject("Incorrecto");
    }*/

    return this.http.post('http://localhost:8080/login', {'username': username, 'password': password})
               .toPromise()
               .then(response => response.json().data as Session)
               .catch( (e) => {
                 console.log(e);
                 return Promise.reject(e);
               });
  }

  cookies = () => {
    this.http.get('http://localhost:8080/cookies');
  }

  checkIsAlumn = (username): Promise<Boolean> => {
    return Promise.resolve((SESSIONS.find((e) => {
      return e.username === username;
    }).isAlumno));
  }


}
