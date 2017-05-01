import { Component, OnInit } from '@angular/core';
import { TheoryService } from "app/theory/core/theory.service";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";

@Component({
  selector: 'app-confirm-changes',
  templateUrl: './confirm-changes.component.html',
  styleUrls: ['./confirm-changes.component.css']
})
export class ConfirmChangesComponent implements OnInit {

  private username;
  private isAlumn;
  private data;

  constructor(private theoryService:TheoryService,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.standartOnInit()
  }

  standartOnInit(){
    let session = this.sessionService.session;
    if(session){
      if((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            this.isAlumn = session.isAlumn;
            this.username = session.username;
            this.sessionService.updateSession(session);
            this.onInitTasks();
          },
          error => {
            console.log(error);
            this.sessionService.logout();
            this.router.navigate(['/login']);
          }
        )
      }
      else{
        this.isAlumn = (<Session> session).isAlumn;
        this.username = (<Session> session).username;
        this.onInitTasks();
      }
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onInitTasks(){
    this.data = this.theoryService.preparedData;
    if(this.data === undefined){
      this.router.navigate(['/theory']);
    }
  }

  sendData(){
    this.theoryService.sendData(this.data).subscribe(
      null,
      error => {console.log('ASD');this.router.navigate(['/server-error', error])}
    );
  }

}
