import { SessionService } from "app/core/session/session.service";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core/";

export abstract class ComponentWithSession implements OnInit {
  private _session;

  protected get session(){
    return this._session;
  }

  protected set session(session){
    this._session = session;
  }

  protected get router(){
    return this._router;
  }

  protected get sessionService(){
    return this._sessionService;
  }

  constructor(private _sessionService: SessionService,
              private _router: Router){}
  
  protected abstract onInitTasks(): any;

  protected goToErrorPage(error){
    this.router.navigate(['/server-error', error, this.router.url]);
  }

  ngOnInit(): void {
    let session = this.sessionService.session;
    if(session){
      if((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            this._session = session;
            this.sessionService.session = session;
            this.onInitTasks();
          },
          error => {
            this.goToErrorPage(error)
          }
        )
      }
      else{
        this._session = session;
        this.onInitTasks();
      }
    }
    else{
      this.router.navigate(['/user-not-logged']);
    }
  }
}