import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Location } from '@angular/common';

import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-question-confirmation',
  templateUrl: './question-confirmation.component.html',
  styleUrls: ['./question-confirmation.component.css']
})
export class QuestionConfirmationComponent extends ComponentWithSession {

  private question;
  private lessonId;
  private sectionId;

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
      error => { this.router.navigate(['/server-error', error]) }
    )
  }

  send() {
    this.questionsService.respondQuestion(this.question).subscribe(
      () => { this.router.navigate(['/theory']) },
      (error) => {this.router.navigate(['/server-error', error])}
    )
  }

  isValid(question){
    return true
  }

}
