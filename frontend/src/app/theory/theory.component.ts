import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';
import { TheoryService } from 'app/theory/core/theory.service'

import { Session } from 'app/core/session/session'

import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { DELETE } from "app/core/utils/const";

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent extends ComponentWithSession {
    
  onInitTasks() {
    this.route.params.subscribe((params) => this.initSectionId = params.init)
  }

  private lesson;
  private section;
  private searchText;
  private initSectionId;

  onKeywordClick(searchText) {
    this.searchText = searchText;
  }

  onLessonChange(lesson) {
    this.lesson = JSON.parse(lesson);
  }

  onSectionClick(section) {
    this.section = JSON.parse(section);
  }

  onError(error){
    this.goToErrorPage(error);
  }

  constructor(sessionService: SessionService,
              router: Router,
              private theoryService: TheoryService,
              private route: ActivatedRoute){
                super(sessionService, router)
              }

  searchActive(){
    return this.searchText ? this.searchText.length > 0 : false;
  }

  doSome(some){
    console.log(this.section.contentImage + "");
  }

  goToQuestions(){
    this.router.navigate(['/questions', {lessonId: this.lesson.id, sectionId: this.section.id}]);
  }

  goToTheoryEditorEdit(){
    this.router.navigate(['/theory/editor', {lessonId: this.lesson.id, sectionId: this.section.id}]);
  }

  goToTheoryEditorAdd(){
    this.router.navigate(['/theory/editor', {lessonId: this.lesson.id}]);
  }
  
  goToConfirmation(){
    this.theoryService.prepareData(DELETE, this.lesson, this.section);
    this.router.navigate(['/theory/change-confirmation']);
  }
    
}
