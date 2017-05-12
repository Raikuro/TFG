import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Question } from "app/theory/core/question";

@Component({
  selector: 'app-unresponded-question-list',
  templateUrl: './unresponded-question-list.component.html',
  styleUrls: ['./unresponded-question-list.component.css']
})
export class UnrespondedQuestionListComponent extends ComponentWithSession {
  
  private questions: Question[];

  onInitTasks() {
    this.getUnrespondedQuestions();
  }

  constructor(sessionService: SessionService,
    router: Router,
    private questionService: QuestionsService){
    super(sessionService, router);
  }

  thereAreUnrespondedQuestions(){
    return this.questions ? this.questions.length > 0 : false
  }

  getUnrespondedQuestions(){
    this.questionService.getUnrespondedQuestions().subscribe(
      questions => {this.questions = questions },
      error => { console.log(error) }
    )
  }

  respondQuestion(question){
    this.questionService.prepareData(question)
  }

  reportQuestion(question){
    this.questionService.reportQuestion(question).subscribe(
      res => { this.reloadPage() },
      error => { console.log(error) }
    )
  }

  reloadPage() {
    window.location.reload();
  }

}
