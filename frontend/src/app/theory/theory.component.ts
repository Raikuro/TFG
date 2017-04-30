import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';
import { TheoryService } from 'app/theory/theory.service'

import { Session } from 'app/core/session/session'

import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/theory";
import { Section } from "app/theory/section";

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
    console.log(this.section);
  }

  goToTheoryEditorEdit(){
    this.router.navigate(['/theory-editor', {theme: this.theme, section: this.section}]);
  }

  goToTheoryEditorAdd(){
    this.router.navigate(['/theory-editor']);
  }

  selectSection(section){
    this.section = section;
    let content = this.theoryService.getSection(this.theme.id, this.section.id)
    if((<Observable<Section>>content).subscribe){
      (<Observable<Section>>content).subscribe(
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
    
}
