import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Question } from "app/theory/core/question";

const REPORT_ALERT = {
  msg: 'La duda va a ser reportada. Confirme',
  closable: true,
  type: 'danger'
};

const IGNORE_ALERT = {
  msg: 'La duda va a ser marcada como repetida. Confirme',
  closable: true,
  type: 'warning'
};

@Component({
  selector: 'app-unresponded-question-list',
  templateUrl: './unresponded-question-list.component.html',
  styleUrls: ['./unresponded-question-list.component.css']
})
export class UnrespondedQuestionListComponent extends ComponentWithSession {
  
  private questionsData: {
    associatedSection: {},
    question: Question
  }[];

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
    return this.questionsData ? this.questionsData.length > 0 : false
  }

  getUnrespondedQuestions(){
    this.questionService.getUnrespondedQuestions().subscribe(
      questions => { this.questionsData = questions },
      error => this.goToErrorPage(error)
    )
  }

  goToTheoryRelated(section){
    this.router.navigate(['/theory/'+section.id])
  }

  respondQuestion(question){
    this.questionService.prepareData(question)
    this.router.navigate(['/questions/respond'])
  }

  reportQuestion(question, index){
    this.addAlert(REPORT_ALERT, question, index)
    /*this.questionService.reportQuestion(question).subscribe(
      res => {
        this.addAlert(REPORT_ALERT)
        this.questions.splice(index,1);
      },
      error => this.goToErrorPage(error)
    )*/
  }

  confirmation(alert){
    switch (alert.type){
      case 'warning':
        this.questionService.ignoreQuestion(alert.question).subscribe(
        res => {
          this.questionsData.splice(alert.index,1);
        },
        error => this.goToErrorPage(error)
      )
      break;
      case 'danger':
        this.questionService.reportQuestion(alert.question).subscribe(
        res => {
          this.questionsData.splice(alert.index,1);
        },
        error => this.goToErrorPage(error)
      )
      break;
      default:
    }
    this.closeAlert(alert)
  }

  ignoreQuestion(question, index){
    this.addAlert(IGNORE_ALERT, question, index)
        
    /*this.questionService.ignoreQuestion(question).subscribe(
      res => {
        this.addAlert(IGNORE_ALERT)
        this.questions.splice(index,1);
      },
      error => this.goToErrorPage(error)
    )*/
  }

  addAlert(alert, question, index){
    alert.question = question;
    alert.index = index;
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
