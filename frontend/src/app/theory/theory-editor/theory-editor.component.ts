import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Session } from 'app/core/session/session'
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import {Location} from '@angular/common';

const ADD = 0;
const EDIT = 1;

@Component({
  selector: 'app-theory-editor',
  templateUrl: './theory-editor.component.html',
  styleUrls: ['./theory-editor.component.css']
})
export class TheoryEditorComponent implements OnInit {

  private isAlumn;
  private username;
  private lessons;
  private mode;
  private lesson;
  private section;
  private ready;
  
  constructor(private theoryService:TheoryService,
              private sessionService: SessionService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location
    ) { }
  
  goToConfirmation(){
    this.theoryService.prepareData(this.mode, this.lesson, this.section);
    this.router.navigate(['/theory-change-confirmation']);
  }

  doSome(a){
    console.log(this.section);
  }

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

  isReadyToSend(){
    if(this.section){
      return this.section.title.length > 0 && this.section.content.length > 0;
    }
    return false;
  }
  
  onInitTasks(){
    this.ready = false;
    if(this.isAlumn){
      this.location.back();
    }
    else{
      let index = this.theoryService.index;
      if((<Observable<Theory>>index).subscribe){
        (<Observable<Theory>>index).subscribe(
          index => {
            this.lessons = index.lessons;
            this.onInitTaskNext()
          },
          error => console.log(error)
        )
      }
      else{
        this.lessons = (<Theory>index).lessons;
        this.onInitTaskNext()
      }
    }
  }

  onInitTaskNext(){
      this.route.params.subscribe(
      params => {
        this.lesson = this.lessons[params.lessonId-1];
        console.log(this.lesson);
        let sectionId = params.sectionId;
        if(this.lesson){
          if(sectionId){
            this.mode = EDIT;
            let section = this.theoryService.getSection(this.lesson.id, sectionId)
            if((<Observable<Section>>section).subscribe){
              (<Observable<Section>>section).subscribe(
                section => {
                  this.section = section;
                },
                error => console.log(error)
              )
            }
            else{
              this.section = (<Section>section);
            }
          }
          else{
            this.mode = ADD;
          }
        }
        else{
          this.lesson = this.lessons[0];
        }
      },
      error => console.log(error)
    )
  }

}
