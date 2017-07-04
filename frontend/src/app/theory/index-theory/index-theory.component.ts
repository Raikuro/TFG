import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TheoryService } from "app/theory/core/theory.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { SessionService } from "app/core/session/session.service";
import { Session } from "app/core/session/session";
import { DELETE } from "app/core/utils/const";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-index-theory',
  templateUrl: './index-theory.component.html',
  styleUrls: ['./index-theory.component.css']
})
export class IndexTheoryComponent implements OnInit {

  private lessons;
  private sections;
  private lesson;
  private section;
  @Input('isAlumn') private isAlumn;
  @Input('initSectionId') private initSectionId;
  @Output() onKeywordClick = new EventEmitter<String>();
  @Output() onSectionClick = new EventEmitter<String>();
  @Output() onLessonChange = new EventEmitter<String>();
  @Output() onError = new EventEmitter<String>();

  constructor(private router: Router,
              private theoryService: TheoryService,
              private sanitizer: DomSanitizer) {}

  ngOnInit(){
    let index = this.theoryService.index;
    if((<Observable<Theory>> index).subscribe){
      (<Observable<Theory>> index).subscribe(
        index => {
          this.assignLessons(index)
          this.theoryService.index = index
        },
        error => this.router.navigate(['/server-error', error]))
    }
    else{
      this.assignLessons(index)
    }
  }

  assignLessons(index){
    this.lessons = index.lessons;
    this.changeLesson(this.lessons[0]);
    if(this.initSectionId){
      this.selectInitSection(this.initSectionId)
    }
    else{
      this.selectSection(this.sections[0])
    }
  }

  doSome(a){
    console.log(a)
  }

  selectInitSection(sectionId){
    let initSection
    let initLesson = this.lessons.find((lesson)=>{
      initSection = lesson.sections.find((section)=>{
        return section.id == sectionId
      })
      return initSection;
    })
    this.changeLesson(initLesson)
    this.selectSection(initSection)
  }
  
  sendError(error){
    this.onError.emit(error)
  }

  imSelected(section){
    if(this.section){
      return this.section.id == section.id
    }
    return false
  }

  assignSection(section){
    this.section = section
    this.onSectionClick.emit(JSON.stringify(section))
  }

  selectSection(section){
    this.section = section;
    let response = this.theoryService.getSection(this.lesson.id, this.section.id)
    if((<Observable<Section>>response).subscribe){
      (<Observable<Section>>response).subscribe(
        section => {
          this.assignSection(section);
          this.theoryService.updateSectionsCache(section, this.lesson.id, this.section.id);
        },
        error => /*this.router.navigate(['/server-error', error])*/ this.sendError(error)
      )
    }
    else{
      this.assignSection(response);
    }
  }

  changeLesson(lesson){
    this.lesson = lesson;
    this.onLessonChange.emit(JSON.stringify(this.lesson))
    this.sections = this.lesson.sections;
    if(this.sections && this.sections[0]){
      this.section = this.sections[0]
    }
  }

  goToQuestions(){
    this.router.navigate(['/questions', {lessonId: this.lesson.id, sectionId: this.section.id}]);
  }

  goToTheoryEditorEdit(){
    this.router.navigate(['/theory/editor', {lessonId: this.lesson.id, sectionId: this.section.id}]);
  }

  goToConfirmation(){
    this.theoryService.prepareData(DELETE, this.lesson, this.section);
    this.router.navigate(['/theory/change-confirmation']);
  }
}
