import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TestService } from "app/test/test.service";
import { EDIT, ADD, DELETE } from "app/core/utils/const";

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
    let data = this.testService.getData();
    this.mode = data.mode;
    this.lessonId = data.lessonId;
    this.question = data.question;
    console.log(this.mode, this.lessonId, this.question);
  }

  constructor(sessionService: SessionService, router: Router, private testService: TestService) {
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
    this.testService.sendData(this.question, this.mode, this.lessonId).subscribe(
      res => console.log(res),
      error => console.log(error)
    )
  }

}
