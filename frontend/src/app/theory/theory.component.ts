import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SessionService } from 'app/core/session/session.service';
import { TheoryService } from 'app/theory/core/theory.service'

import { Session } from 'app/core/session/session'

import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { ComponentWithSession } from "app/theory/core/componentWithSession";

const DELETE = 2;

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent extends ComponentWithSession {
    
  onInitTasks() {}

  private lessons;
  private sections;
  private lesson;
  private section;
  private searchText;

  onKeywordClick(searchText) {
    this.searchText = searchText;
  }

  constructor(sessionService: SessionService,
              router: Router,
              private theoryService: TheoryService){
                super(sessionService, router)
              }

  searchActive(){
    return this.searchText ? this.searchText.length > 0 : false;
  }

  doSome(some){
    console.log(this.searchText);
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
