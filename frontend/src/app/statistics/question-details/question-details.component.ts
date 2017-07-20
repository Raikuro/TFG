import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { StatisticsService } from "app/statistics/core/statistics.service"
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent extends ComponentWithSession {
  
  private question

  protected onInitTasks() {
    this.question = this.statisticsService.getQuestionData()
    if (this.question === undefined){
      this.goBack()
    }
  }

  constructor(private statisticsService: StatisticsService,
              sessionService: SessionService,
              router: Router,
              private location: Location) {
    super(sessionService, router);
  }

  goBack() {
    this.location.back();
  }

}
