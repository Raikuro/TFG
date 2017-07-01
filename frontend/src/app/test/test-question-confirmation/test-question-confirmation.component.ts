import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TestService } from "app/test/core/test.service";
import { EDIT, ADD, DELETE } from "app/core/utils/const";
import { Location } from '@angular/common';


@Component({
  selector: 'app-test-question-confirmation',
  templateUrl: './test-question-confirmation.component.html',
  styleUrls: ['./test-question-confirmation.component.css']
})

export class TestQuestionConfirmationComponent extends ComponentWithSession {

  private question;
  private mode;
  private lessonId;

  onInitTasks() {
    let data = this.testService.confirmationData;
    if(data){
      this.mode = data.mode;
      this.lessonId = data.lessonId;
      this.question = data.question;
    }
    else{
      this.location.back()
    }
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService,
              private location: Location) {
    super(sessionService, router)
  }

  getMode(){
    if(this.mode === EDIT){
      return 'EDITAR';
    }
    if(this.mode === ADD){
      return 'AÑADIR';
    }
    if(this.mode === DELETE){
      return 'BORRAR';
    }
  }

  sendData(){
    console.log(this.question)
    this.testService.sendData(this.question, this.mode, this.lessonId).subscribe(
      () => this.router.navigate(['/test']),
      error => this.goToErrorPage(error)
    )
  }

  goBack() {
    this.location.back();
  }

}
