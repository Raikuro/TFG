import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';
import { TheoryService } from 'app/theory/theory.service'

import { Session } from 'app/core/session/session'

import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/theory";

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {

  private isAlumn;
  private username;
  private themes;
  private sections;
  private theme;
  private section;
  private sectionData;

  constructor(private sessionService: SessionService, private router: Router, private theoryService: TheoryService) { }

  onThemeSeletorChange(theme){
    this.theme = theme;
    this.sections = this.theme.sections;
  }

  doSome(some){
    console.log(some);
  }

  selectSection(section){
    this.section = section;
    let content = this.theoryService.getSection(this.theme.id, this.section.id)
    if(content['subscribe']){
      content['subscribe'](
        sectionData => {
          this.sectionData = sectionData['body'];
          this.theoryService.updateSectionsCache(this.sectionData, this.theme.id, this.section.id)
        },
        error => {
          console.log(error);
          this.sessionService.logout();
          this.router.navigate(['/login']);
        }
      )
    }
    else{
      this.sectionData = content;
    }
  }

  ngOnInit() {
    this.allOnInit(this.onInitTasks(this.theoryService));
  }

  onInitTasks(theoryService: TheoryService){
    let index = this.theoryService.index;
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
    }
  }

  allOnInit(next){
    let session = this.sessionService.session;
    if(session){
      if((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            this.isAlumn = session.isAlumn;
            this.username = session.username;
            this.sessionService.updateSession(session);
            if(next){
              next()
            }
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
      }
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
