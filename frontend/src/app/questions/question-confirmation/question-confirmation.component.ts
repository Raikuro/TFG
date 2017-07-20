import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { QuestionsService } from "app/core/questionService/questions.service";
import { Location } from '@angular/common';

import { Observable } from "rxjs/Observable";
import { EDIT, ADD } from "app/core/utils/const";


@Component({
  selector: 'app-question-confirmation',
  templateUrl: './question-confirmation.component.html',
  styleUrls: ['./question-confirmation.component.css']
})
export class QuestionConfirmationComponent extends ComponentWithSession {

  private question;
  private lessonId;
  private sectionId;
  private mode;
  private aux;

  constructor(sessionService: SessionService,
              router: Router,
              private questionsService: QuestionsService,
              private location: Location,
              private route: ActivatedRoute) {
    super(sessionService, router)
  }

  onInitTasks() {
    this.question = this.questionsService.getPreparedData()
    if(this.question === undefined || !this.isValid(this.question)){
      this.location.back();
    }
    this.route.params.subscribe(
      params => {
        this.lessonId = params.lessonId;
        this.sectionId = params.sectionId;
      },
      error => this.goToErrorPage(error)
    )
  }

  send() {
    if(this.lessonId && this.sectionId){
      this.questionsService.sendData(this.question, this.lessonId, this.sectionId).subscribe(
        () => { this.router.navigate(['/theory']) },
        (error) => this.goToErrorPage(error)
      )
    }
    else{
      this.questionsService.setQuestion(this.question).subscribe(
          () => { this.router.navigate(['/theory']) },
          (error) => this.goToErrorPage(error)
      )
    }
  }

  goBack() {
    this.location.back();
  }

  isValid(question){
    return true
  }

}
