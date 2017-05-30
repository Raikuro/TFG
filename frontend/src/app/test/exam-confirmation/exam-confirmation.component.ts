import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestService } from "app/test/test.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-exam-confirmation',
  templateUrl: './exam-confirmation.component.html',
  styleUrls: ['./exam-confirmation.component.css']
})
export class ExamConfirmationComponent extends ComponentWithSession {
  
  private test;

  onInitTasks() {
    this.test = this.testService.test
    //console.log(this.test)
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
      error => this.goToErrorPage())
  }

  goToErrorPage(){
    console.log('error')
  }
  
  getState(question){
    let aux = question.testOptions.map(option => {return option.isCorrect})
    let stateAux = aux.reduce((last, actual, i) => {
      console.log(question.id, "--->", last, ", ", actual, "@@@@", i, "#####", last + actual)
      return last + actual;
    })
    if(stateAux > 0){return "Respondido"}
    else{return "No respondido"}
  }

}
