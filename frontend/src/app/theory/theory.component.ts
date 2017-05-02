import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';
import { TheoryService } from 'app/theory/core/theory.service'

import { Session } from 'app/core/session/session'

import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";


const DELETE=2;

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {

  //private isAlumn;
  //private username;
  private session;
  private lessons;
  private sections;
  private lesson;
  private section;

  constructor(private sessionService: SessionService,
              private router: Router,
              private theoryService: TheoryService) { }

  onLessonSeletorChange(lesson){
    this.lesson = lesson;
    this.sections = this.lesson.sections;
  }

  doSome(some){
    console.log(this.section);
  }

  goToTheoryEditorEdit(){
    this.router.navigate(['/theory-editor', {lessonId: this.lesson.id, sectionId: this.section.id}]);
  }

  goToTheoryEditorAdd(){
    this.router.navigate(['/theory-editor', {lessonId: this.lesson.id}]);
  }

  selectSection(section){
    this.section = section;
    let response = this.theoryService.getSection(this.lesson.id, this.section.id)
    if((<Observable<Section>>response).subscribe){
      (<Observable<Section>>response).subscribe(
        section => {
          console.log(section)
          this.section.content = section.content;
          this.section.keywords = section.keywords;
          //this.theoryService.updateSectionsCache(section, this.lesson.id, this.section.id)
        },
        error => {
          this.router.navigate(['/server-error', error]);
        }
      )
    }
    /*else{
      this.section.content = response.content;
    }*/
  }

  ngOnInit() {
    this.standartOnInit();
  }

  standartOnInit(){
    let session = this.sessionService.session;
    if(session){
      if((<Observable<Session>> session).subscribe){
        (<Observable<Session>> session).subscribe(
          session => {
            //this.isAlumn = session.isAlumn;
            //this.username = session.username;
            this.session = session;
            this.sessionService.updateSession(session);
            this.onInitTasks();
          },
          error => {
            console.log(error);
            this.router.navigate(['/server-error', error]);
          }
        )
      }
      else{
        //this.isAlumn = (<Session> session).isAlumn;
        //this.username = (<Session> session).username;
        this.session = session;
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
          this.lessons = index.lessons;
          this.lesson = this.lessons[0];
          this.sections = this.lesson.sections;
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      )
    }
    /*else{
      this.lessons = (<Theory> index).lessons;
      this.lesson = this.lessons[0];
      this.sections = this.lesson.sections;
    }*/
  }

  goToConfirmation(){
    this.theoryService.prepareData(DELETE, this.lesson, this.section);
    this.router.navigate(['/theory-change-confirmation']);
  }
    
}
