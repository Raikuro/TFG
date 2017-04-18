import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService} from '../core/session/session.service'
import { Session } from '../core/session/session'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  doSome = () => {
    
  };

  login = () => {
    this.sessionService.login(this.username, this.password).then( (res) => {
      //console.log(res);
      this.router.navigate(['./theory', this.username]);
    }).catch( (e) => {
      console.log(e);
    });
  }

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

}
