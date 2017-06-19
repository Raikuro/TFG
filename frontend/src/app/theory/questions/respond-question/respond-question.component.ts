import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-respond-question',
  templateUrl: './respond-question.component.html',
  styleUrls: ['./respond-question.component.css']
})
export class RespondQuestionComponent extends ComponentWithSession {
  
  private question;

  onInitTasks() {
    if(!this.session.isAlumn){
      this.question = this.questionsService.getPreparedData();
      if(this.question === undefined){
        this.location.back();
      }
    }
  }

  constructor(router: Router,
              sessionService: SessionService,
              private questionsService: QuestionsService,
              private location: Location) {
                super(sessionService, router)
              }

  isReadyToSend(){
    return this.question ? this.question.response : false;
  }

  goToQuestionConfirmation(){
    this.questionsService.prepareData(this.question)
    this.router.navigate(['/questions/confirmation']);
  }

}
