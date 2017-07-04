import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TheoryService } from "app/theory/core/theory.service";
import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { DELETE } from "app/core/utils/const";


@Component({
  selector: 'app-search-theory',
  templateUrl: './search-theory.component.html',
  styleUrls: ['./search-theory.component.css']
})
export class SearchTheoryComponent implements OnChanges {

  private lessons;
  private sections;
  private lesson;
  private section;
  @Input('searchQuery') private searchQuery;
  @Input('isAlumn') private isAlumn;
  @Output() onKeywordClick = new EventEmitter<String>();
  @Output() onSectionClick = new EventEmitter<String>();
  @Output() onLessonChange = new EventEmitter<String>();
  @Output() onError = new EventEmitter<String>();

  constructor(private router: Router,
              private theoryService: TheoryService) {}

  ngOnChanges(changes: any) {
    this.lesson = undefined;
    this.section = undefined;
    this.theoryService.search(changes.searchQuery.currentValue).subscribe(
      (result) => this.assignLessons(result),
      (error) => /*this.router.navigate(['/server-error', error])*/ this.sendError(error)
    )
  }

  sendError(error){
    this.onError.emit(JSON.stringify(error))
  }
  
  assignLessons(index){
    if(index.lessons.length > 0){
      this.lessons = index.lessons;
      this.lesson = this.lessons[0];
      this.onLessonChange.emit(JSON.stringify(this.lesson))
      this.sections = this.lesson.sections
      if(this.sections && this.sections[0]){
        this.selectSection(this.sections[0])
      }
    }
    else{
      this.lessons = []
      this.sections = []
    }
  }

  imSelected(section){
    if(this.section){
      return this.section.id == section.id
    }
    return false
  }

  selectSection(section){
    this.section = section;
    this.onSectionClick.emit(JSON.stringify(section))
  }

  onLessonSelectorChange(lesson){
    this.lesson = lesson;
    this.onLessonChange.emit(JSON.stringify(this.lesson))
    this.sections = this.lesson.sections;
    if(this.sections && this.sections[0]){
        this.selectSection(this.sections[0])
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
