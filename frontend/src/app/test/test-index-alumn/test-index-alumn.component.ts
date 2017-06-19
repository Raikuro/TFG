import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestService } from "app/test/core/test.service";
import { TheoryService } from "app/theory/core/theory.service";

@Component({
  selector: 'app-test-index-alumn',
  templateUrl: './test-index-alumn.component.html',
  styleUrls: ['./test-index-alumn.component.css']
})
export class TestIndexAlumnComponent extends ComponentWithSession {
  
  private _TESTSIZE = 20;
  private lesson;
  private lessons;
  private concept;

  onInitTasks() {
    this.theoryService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.goToErrorPage(error)
    )
  }

  doSome(){
    console.log(this.concept)
  }

  constructor(private testService: TestService,
              sessionService: SessionService,
              router: Router,
              private theoryService: TheoryService) {
    super(sessionService, router)
  }

  searchByConcept(){
    this.testService.prepareTestByConcept(this.concept, this._TESTSIZE)
    .then(() => this.goToTestPage())
    .catch(error => this.goToErrorPage(error))
  }

  goToErrorPage(error){
    this.goToErrorPage(error)
  }

  goToTestPage(){
    this.router.navigate(['/exam'])
  }

  searchByLesson(){
    this.testService.prepareTestByLesson(this.lesson.id, this._TESTSIZE)
    .then(() => this.goToTestPage())
    .catch(error => this.goToErrorPage(error));
  }

  onLessonSelectorChange(lesson){
    this.lesson = lesson;
  }

  searchGeneral(){
    this.testService.prepareTestGeneral(this._TESTSIZE)
    .then(() => this.goToTestPage())
    .catch(error => this.goToErrorPage(error));
  }

}
