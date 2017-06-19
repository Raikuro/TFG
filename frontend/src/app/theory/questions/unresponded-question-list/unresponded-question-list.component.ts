import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Question } from "app/theory/core/question";

const REPORT_ALERT = {
  msg: 'La duda ha sido reportada.',
  closable: true,
  type: 'danger'
};

const IGNORE_ALERT = {
  msg: 'La duda ha sido marcada como repetida.',
  closable: true,
  type: 'warning'
};

@Component({
  selector: 'app-unresponded-question-list',
  templateUrl: './unresponded-question-list.component.html',
  styleUrls: ['./unresponded-question-list.component.css']
})
export class UnrespondedQuestionListComponent extends ComponentWithSession {
  
  private questions: Question[];

  private alerts;

  onInitTasks() {
    this.alerts=[];
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
      questions => { this.questions = questions },
      error => this.goToErrorPage(error)
    )
  }

  respondQuestion(question){
    this.questionService.prepareData(question)
    this.router.navigate(['/questions/respond'])
  }

  reportQuestion(question, index){
    this.questionService.reportQuestion(question).subscribe(
      res => {
        this.addAlert(REPORT_ALERT)
        this.questions.splice(index,1);
      },
      error => this.goToErrorPage(error)
    )
  }

  ignoreQuestion(question, index){
    this.questionService.ignoreQuestion(question).subscribe(
      res => {
        this.addAlert(IGNORE_ALERT)
        this.questions.splice(index,1);
      },
      error => this.goToErrorPage(error)
    )
  }

  addAlert(alert){
    this.alerts.push(alert)
  }

  /*reloadPage() {
    window.location.reload();
  }*/

  public closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
