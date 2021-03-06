import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Session } from 'app/core/session/session'
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { Location } from '@angular/common';
import { ComponentWithSession } from "app/core/session/componentWithSession";

const ADD = 0;
const EDIT = 1;

@Component({
  selector: 'app-theory-editor',
  templateUrl: './theory-editor.component.html',
  styleUrls: ['./theory-editor.component.css']
})
export class TheoryEditorComponent extends ComponentWithSession {

  private lessons;
  private mode;
  private lesson;
  private section;
  private ready;
  
  constructor(private theoryService:TheoryService,
              sessionService: SessionService,
              router: Router,
              private route: ActivatedRoute,
              private location: Location
    ) {super(sessionService, router)}
  
  goToConfirmation(){
    this.theoryService.prepareData(this.mode, this.lesson, this.section);
    this.router.navigate(['/theory/change-confirmation']);
  }

  doSome(a){
    console.log(this.section, this.isReadyToSend());
  }

  isReadyToSend(){
    if(this.section && this.section.title && this.section.content){
      return this.section.title.length > 0 && this.section.content.length > 0;
    }
  }
  
  onInitTasks(){
    this.ready = false;
    if(this.session.isAlumn){
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
            this.section = {}
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
