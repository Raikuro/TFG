import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {

  isAlumn;
  username;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    if(this.sessionService.session){
      this.sessionService.session.subscribe(
        session => {
          console.log(session);
          this.isAlumn = session.isAlumn;
          this.username = session.username;
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      )
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  
}
