import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SessionService} from 'app/core/session/session.service'
import { Session } from 'app/core/session/session'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  username: String;
  password: String;

  doSome(){
    console.log(this.errorMessage);
  };
  
  login(){
    this.sessionService.login(this.username, this.password).subscribe(
      (session) => {
        console.log(session);
        this.router.navigate(['/theory']);
      },
      error => console.log(error)
    )
  }

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    let session = this.sessionService.session;
    if(session){
      if ((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            this.sessionService.updateSession(session);
            this.router.navigate(['/theory']);
          },
          error => console.log(error)
        )
      }
      else{
        this.sessionService.logout();
      }
    }
  }
}
