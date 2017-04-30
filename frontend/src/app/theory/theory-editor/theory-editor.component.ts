import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Session } from 'app/core/session/session'
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TheoryService } from "app/theory/theory.service";
import { Theory } from "app/theory/theory";
import { Section } from "app/theory/section";

@Component({
  selector: 'app-theory-editor',
  templateUrl: './theory-editor.component.html',
  styleUrls: ['./theory-editor.component.css']
})
export class TheoryEditorComponent implements OnInit {

  private isAlumn;
  private username;
  private theme;
  private section;
  private themes;
  
  constructor(private theoryService:TheoryService, private sessionService: SessionService, private router: Router, private route: ActivatedRoute,
    ) { }

  doSome(){
    console.log(this.section);
  }

  ngOnInit() {
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
    this.section = {};
    this.route.params.subscribe(
      params => {
        this.theme = params.theme;
        this.section = params.section;
      }
    )
    let index = this.theoryService.index;
    if((<Observable<Theory>>index).subscribe)
      (<Observable<Theory>>index).subscribe(
        index => {
          this.themes = index.themes;
          this.theme = this.themes[0];
        },
        error => console.log(error)
      )
    else{
      this.themes = (<Theory>index).themes;
      this.theme = this.themes[0];
    }
    console.log()
    /*let index = this.theoryService.index;
    if((<Observable<Theory>> index).subscribe){
      (<Observable<Theory>> index).subscribe(
        index => {
          this.themes = index.themes;
          this.theme = this.themes[0];
          this.sections = this.theme.sections;
        },
        error => {
          console.log(error);
          this.sessionService.logout();
          this.router.navigate(['/login']);
        }
      )
    }
    else{
      this.themes = (<Theory> index).themes;
      this.theme = this.themes[0];
      this.sections = this.theme.sections;
    }*/
  }

}
