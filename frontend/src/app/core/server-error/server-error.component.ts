import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent extends ComponentWithSession {
  protected onInitTasks() {
    this.route.params.subscribe(
      params => {
        this.result = btoa(JSON.stringify({'error': params.error, 'url': params.url, 'user': this.session})),
        error => this.result = btoa(JSON.stringify(error))
      }
    )
  }

  ngOnInit(){
    let session = this.sessionService.session;
    if(session){
      if((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            this.session = session;
            this.sessionService.session = session;
            this.onInitTasks();
          },
          error => {
            this.goToErrorPage(error)
          }
        )
      }
      else{
        this.session = session;
        this.onInitTasks();
      }
    }
    else{
      this.result = btoa("ERROR EN LOGIN")
    }
  }

  constructor(private route: ActivatedRoute,
              sessionService: SessionService,
              router: Router){
    super(sessionService, router);
  }

  private result;

}
