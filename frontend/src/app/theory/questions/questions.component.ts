import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/theory/core/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";
import { Question } from "app/theory/core/question";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends ComponentWithSession {
  
  protected session: Session
  private questions: Question[]
  
  onInitTasks() {
    this.route.params.subscribe(
      params => {
        let lessonId = params.lessonId;
        let sectionId = params.sectionId;
        this.questionsService.getQuestions(lessonId, sectionId).subscribe(
          questions => {
            console.log(questions)
          },
          error => {}
        )
      },
      error => {}
    )
  }

  constructor(router: Router,
              sessionService: SessionService,
              private questionsService: QuestionsService,
              private route: ActivatedRoute) {
    super(sessionService, router)
  }

  

}
