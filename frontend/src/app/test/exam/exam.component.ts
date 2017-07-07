import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestService } from "app/test/core/test.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent extends ComponentWithSession {
  
  private test;

  onInitTasks() {
    this.test = this.testService.test
    if(this.test === undefined){
      this.router.navigate(['/test'])
    }
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService,
              private location: Location) {
    super(sessionService, router)
  }

  goToConfirmationExam(){
    this.testService.saveExamForConfirmation(this.test)
    this.router.navigate(['/exam/confirmation'])
  }

  goBack(){
    this.location.back()
  }

  thereIsTest(){
    return this.test.length > 0
  }

  isQuestionAnswered(question){
    return question.testOptions.reduce((previous, current) => {
      return typeof(previous) === 'object' ? previous.isCorrect + current.isCorrect :
        previous + current.isCorrect
    })
  }

  goToQuestion(index){
    window.location.hash = 'q'+index;
  }

}
