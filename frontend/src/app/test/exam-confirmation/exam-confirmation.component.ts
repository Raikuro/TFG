import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestService } from "app/test/core/test.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-exam-confirmation',
  templateUrl: './exam-confirmation.component.html',
  styleUrls: ['./exam-confirmation.component.css']
})
export class ExamConfirmationComponent extends ComponentWithSession {
  
  private test;

  onInitTasks() {
    if(this.testService.test){ this.test = this.testService.test }
    else{ this.back() }
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService,
              private location: Location) {
    super(sessionService, router);
  }

  back(){
    this.location.back();
  }

  checkExam(){
    this.testService.checkExam().subscribe(
      result => {
        this.testService.saveResult(result)
        this.router.navigate(['/exam/result'])
      },
      error => this.goToErrorPage(error))
  }
  
  getState(question){
    let aux = question.testOptions
      .map(option => {return option.isCorrect})
      .reduce((last, actual, i) => {return last + actual})
    if(aux > 0){return "Respondido"}
    else{return "No respondido"}
  }

}
