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
export class StatisticsComponent extends ComponentWithSession implements OnInit {
  
  protected onInitTasks() {}

  private questions;
  private records;
  private 
  private username;
  private exams;

  constructor(private statisticsService: StatisticsService, sessionService: SessionService, router: Router) {
    super(sessionService, router);
  }

  getStatistics(){
    console.log(this.username, typeof(this.username))
    this.statisticsService.getStatistics(this.username).subscribe(
      (data) => {
        this.records = data.records;
        this.questions = data.questions;
        this.exams = data.exams;
        console.log(data)
       },
      (err) => { console.log(err) }
    )
  }

}
