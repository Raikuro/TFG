import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { StatisticsService } from "app/statistics/core/statistics.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent extends ComponentWithSession {
  
  protected onInitTasks() {}

  private questions;
  private records;
  private active;
  private username;
  private exams;

  constructor(private statisticsService: StatisticsService,
              sessionService: SessionService,
              router: Router) {
    super(sessionService, router);
  }

  getStatistics(){
    this.active = 0
    this.statisticsService.getStatistics(this.username).subscribe(
      (data) => {
        this.records = data.records;
        this.questions = data.questions;
        this.exams = data.exams;
        this.records = this.records.map((record) => {
          record.dateOf = new Date(record.dateOf)
          return record
        })
        this.exams = this.exams.map((exam) => {
          exam.exam.date = new Date(exam.exam.date)
          return exam
        })
       },
      (err) => { this.goToErrorPage(err) }
    )
  }

  goToQuestionDetail(question){
    this.statisticsService.saveQuestionData(question)
    this.router.navigate(['statistics/question'])
  }

  recreateExamResult(exam){
    this.statisticsService.saveExamData(exam)
    this.router.navigate(['statistics/exam'])
  }

  thereIsData(){
    if(this.records && this.questions && this.exams)
      { return this.records.length > 0 || this.questions.length > 0 || this.exams.length > 0 }
    return false
  }

}
