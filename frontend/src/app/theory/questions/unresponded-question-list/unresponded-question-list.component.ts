import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Question } from "app/theory/core/question";
import { REPORT_ALERT, IGNORE_ALERT } from "app/core/utils/const";

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

  reportQuestion(questionTitle, sectionId, index){
    this.addAlert(REPORT_ALERT, questionTitle, sectionId, index)
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
        this.questionService.ignoreQuestion(alert.questionTitle, alert.sectionId).subscribe(
          res => this.questionsData.splice(alert.index,1),
          error => this.goToErrorPage(error)
        )
      break;
      case 'danger':
        this.questionService.reportQuestion(alert.questionTitle, alert.sectionId).subscribe(
          res => this.questionsData.splice(alert.index,1),
          error => this.goToErrorPage(error)
        )
      break;
      default:
    }
    this.closeAlert(alert)
  }

  ignoreQuestion(questionTitle, sectionId, index){
    this.addAlert(IGNORE_ALERT, questionTitle, sectionId, index)
        
    /*this.questionService.ignoreQuestion(question).subscribe(
      res => {
        this.addAlert(IGNORE_ALERT)
        this.questions.splice(index,1);
      },
      error => this.goToErrorPage(error)
    )*/
  }

  addAlert(alert, questionTitle, sectionId, index){
    alert.questionTitle = questionTitle;
    alert.sectionId = sectionId;
    alert.index = index;
    this.alerts.push(alert)
    console.log(alert)
  }

  /*reloadPage() {
    window.location.reload();
  }*/

  closeAlert(alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  doSome(a){
    console.log(a)
  }

}
